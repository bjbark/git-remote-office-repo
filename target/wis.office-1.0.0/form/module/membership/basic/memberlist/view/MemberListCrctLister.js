Ext.define('module.membership.basic.memberlist.view.MemberListCrctLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-memberlist-crct-lister'			,
	store		: 'module.membership.basic.memberlist.store.MemberListCrct'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}, { ptype:'filterbar'}],
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
//					{xtype:'button',text : '<span class ="btnTemp" style="color:green; font-size : 13px;">추 가</span>', iconCls: Const.INSERT.icon, action : 'crctAction' } ,
//					, '-',
//					{xtype:'button',text : Const.DELETE.text, iconCls: Const.DELETE.icon, handler: me.rowDelete } , '-',
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'	, width:  50, align : 'center'	, text: Language.get('line_stat'	, '상태'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'acce_date'	, width:  90, align : 'center'	, text: Language.get('acce_date'	, '수납일자'		),
					},{ dataIndex: 'qntt'		, width:  80, align : 'right'	, text: Language.get('qntt'			, '레슨횟수'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'pric'		, width:  80, align : 'right'	, text: Language.get('pric'			, '회당레슨비'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'amnt'		, width: 100, align : 'right'	, text: Language.get('amnt'			, '영수금액'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'lssn_stdt'	, width:  90, align : 'center'	, text: Language.get('lssn_stdt'	, '레슨시작일'		),
					},{	dataIndex: 'acce_dvcd'	, width: 100, align : 'center'	, text: Language.get('acce_dvcd'	, '수납구분'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('acce_dvcd') , hidden: true
					},{	dataIndex: 'stot_dvcd'	, width: 100, align : 'center'	, text: Language.get('stot_dvcd'	, '결제방법'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('stot_dvcd') , hidden: true
					},{	dataIndex: 'acct_nmbr'	, width: 130, align : 'center'	, text: Language.get('acct_nmbr'	, '입금계좌번호'	),
					},{	dataIndex: 'drtr_name'	, width: 100, align : 'center'	, text: Language.get('drtr_name'	, '입금 담당'		),
					},{	dataIndex: 'user_memo'	, flex : 1  , align : 'left'	, text: Language.get('user_memo'	, '메모'			),
					},{	dataIndex: 'updt_dttm'	, width: 150, align : 'center'	, text: Language.get('updt_dttm'	, '수정일시'		), hidden : false
					},{	dataIndex: 'crte_dttm'	, width: 150, align : 'center'	, text: Language.get('crte_dttm'	, '생성일시'		), hidden : false
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
			select	= myform.getSelectionModel().getSelection()[0],
			from1='',
			from2=''
			;
		from1	= select.get('acce_date').replace(/-/gi,"");
		from2	= select.get('lssn_stdt').replace(/-/gi,"");
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/membership/memberlist/set/crct.do',
							params	: {
								token	: _global.token_id,
								param	: JSON.stringify({
									mmbr_idcd	: select.get('mmbr_idcd'),
									line_seqn	: select.get('line_seqn'),
									acce_date	: from1,
									qntt		: select.get('qntt'),
									lssn_stdt	: from2,
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
		} // Ext.ComponentQuery.query('module-memberlist-editor')[0].down('[name=modify]').setValue('Y');
	}

});
