Ext.define('module.membership.inout.inotlist.view.InotListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inotlist-lister',
	store		: 'module.membership.inout.inotlist.store.InotList',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
//	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}, { ptype:'filterbar'}],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		console.log(_global.hq_id);
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
//					{	xtype   : 'button',
//						iconCls : 'filterIcon',
//						toggleGroup:'onoff',
//						listeners:{
//							toggle:function(toggle){
//								var filter = me.filterBar;
//									filter.setVisible(toggle.pressed);
//							}
//						}
//					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'		, width:  50, align : 'center'	, text: Language.get('line_stat'	, '상태'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat'),hidden : true
					},{	dataIndex: 'proc_date'		, width:  90, align : 'center'	, text: Language.get('proc_date'	, '방문일자'		),
					},{	dataIndex: 'proc_drtr_idcd'	, width:  90, align : 'center'	, text: Language.get('drtr_idcd'	, '코치코드'		), hidden : true
					},{	dataIndex: 'proc_drtr_name'	, width:  90, align : 'center'	, text: Language.get('drtr_idcd'	, '코치명'		),
					},{	dataIndex: 'proc_time'		, width:  90, align : 'center'	, text: Language.get('proc_time'	, '방문시간'		),
					},{	dataIndex: 'mmbr_idcd'		, width:  90, align : 'center'	, text: Language.get('mmbr_idcd'	, '회원ID'		),hidden : false,
					},{	dataIndex: 'mmbr_name'		, width:  90, align : 'center'	, text: Language.get('mmbr_idcd'	, '회원명'		)
					},{	dataIndex: 'line_seqn'		, width:  90, align : 'center'	, text: Language.get('line_seqn'	, '순번'			),hidden : true,
					},{	dataIndex: 'qntt'			, width:  70, align : 'center'	, text: Language.get('qntt'			, '레슨횟수'		),
					},{	dataIndex: 'resv_date'		, width:  90, align : 'center'	, text: Language.get('resv_date'	, '예약일자'		),
					},{	dataIndex: 'resv_time'		, width:  90, align : 'center'	, text: Language.get('resv_time'	, '예약시간'		),
					},{ dataIndex: 'need_time'		, width:  80, align : 'right'	, text: Language.get('need_time'	, '소요시간'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'acce_date'		, width:  90, align : 'center'	, text: Language.get('resv_date'	, '수납일자'		), hidden : true
					},{	dataIndex: 'acce_seqn'		, width:  90, align : 'center'	, text: Language.get('line_seqn'	, '수납순번'		), hidden : true,
					},{	dataIndex: 'drtr_idcd'		, width:  90, align : 'center'	, text: Language.get('drtr_idcd'	, '코치코드'		), hidden : true
					},{	dataIndex: 'drtr_name'		, width:  90, align : 'center'	, text: Language.get('drtr_idcd'	, '예약코치명'		),
					},{	dataIndex: 'memo'			, flex :   1, align : 'left'	, text: Language.get('memo'			, '메모'			),
					},{	dataIndex: 'resv_stat_dvcd'	, width:  90, align : 'center'	, text: Language.get('resv_stat_dvcd', '예약상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('resv_stat_dvcd')
					},{	dataIndex: 'updt_dttm'		, width: 150, align : 'center'	, text: Language.get('updt_dttm'	, '수정일시'		), hidden : false
					},{	dataIndex: 'crte_dttm'		, width: 150, align : 'center'	, text: Language.get('crte_dttm'	, '생성일시'		), hidden : false
					}
				]
			}
		;
		return item;
	},
	/******************************************************************d
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform	= me.up('grid'),
			store	= myform.getStore(),
			records	= myform.getSelectionModel().getSelection(),
			select	= myform.getSelectionModel().getSelection()[0]
			;
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/membership/inotlist/set/inot.do',
							params	: {
								token	: _global.token_id,
								param	: JSON.stringify({
									mmbr_idcd	: select.get('mmbr_idcd'),
									line_seqn	: select.get('line_seqn'),
									_set		: 'delete'
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									store.reload();
									me.setResponse( {success : true ,  values : baseform , values :form });
									me.close;
								}
							},
							failure : function(result, request) {},
							callback: function(operation){
								myform.getStore().remove (records);
							} /* 성공 실패 관계 없이 호출된다. */
						});
					}
				}
			});
		} // Ext.ComponentQuery.query('module-inotlist-editor')[0].down('[name=modify]').setValue('Y');
	}


});
