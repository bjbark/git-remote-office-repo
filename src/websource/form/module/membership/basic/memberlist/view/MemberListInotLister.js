Ext.define('module.membership.basic.memberlist.view.MemberListInotLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-memberlist-inot-lister'			,
	store		: 'module.membership.basic.memberlist.store.MemberListInot'	,
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
					{	dataIndex: 'line_stat'		, width:  50, align : 'center'	, text: Language.get('line_stat'	, '상태'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'inot_date'		, width:  90, align : 'center'	, text: Language.get('inot_date'	, '일자'			),
					},{	dataIndex: 'inot_time'		, width:  90, align : 'center'	, text: Language.get('inot_time'	, '시간'			),
					},{	dataIndex: 'pass_idcd'		, width:  90, align : 'center'	, text: Language.get('pass_idcd'	, '출입증번호'		),
					},{	dataIndex: 'inot_dvcd'		, width:  90, align : 'center'	, text: Language.get('inot_dvcd'	, '출입구분'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('inot_dvcd')
					},{	dataIndex: 'user_memo'		, flex : 1  , align : 'left'	, text: Language.get( 'user_memo'	, '메모'			),
					},{	dataIndex: 'updt_dttm'		, width: 150, align : 'center'	, text: Language.get( 'updt_dttm'	, '수정일시'		), hidden : false
					},{	dataIndex: 'crte_dttm'		, width: 150, align : 'center'	, text: Language.get( 'crte_dttm'	, '생성일시'		), hidden : false
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
			myform		= me.up('grid'),
			records		= myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						myform.getStore().remove (records);
					}
				}
			});
		}Ext.ComponentQuery.query('module-memberlist-editor')[0].down('[name=modify]').setValue('Y');
	}

});
