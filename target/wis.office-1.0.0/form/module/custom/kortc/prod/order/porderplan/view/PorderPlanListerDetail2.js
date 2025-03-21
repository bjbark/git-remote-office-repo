Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanListerDetail2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-porderplan-lister-detail2',
	store: 'module.custom.kortc.prod.order.porderplan.store.PorderPlanDetail2',

	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
//		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
//	pagingItem : function() {
//		var me = this,
//			item = {
//				xtype : 'grid-paging',
//				items : [
//					'->', '-',
//					{	text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
//						listeners: {
//	 			 			click:function(self,e){
//								me.lineInsert({});
//							}
//						}
//					},
//					'-',
//					{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
//							listeners: {
//								click:function(self,e){
//									me.lineDelete({});
//								}
//							}
//					},
//					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
//				],
//				pagingButton : false
//			}
//		;
//		return item;
//	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'amnd_degr'		,text: Language.get(''	, '변경차수'	),  width: 70 , align : 'center'	,
					},{	dataIndex:	'amnd_date'		,text: Language.get(''	, '변경일자'	),  width: 90 , align : 'center'	,
					},{	dataIndex:	'amnd_resn'		,text: Language.get(''	, '변경내용'	),  flex :  60, align : 'left'	,
					},{	dataIndex:	'drtr_name'		,text: Language.get(''	, '담당자'	),  width : 120, align : 'left'	,
					},{	dataIndex:	'user_memo'		,text: Language.get(''	, '비고'		),  flex :  20, align : 'left'	,
					}
				]
			};
		return item;
	},

	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined

		;

		var new_invc_numb
		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/kortc/prod/order/porderplan/get/invc.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: ''
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				new_invc_numb = result.records[0].seq;
			}
		});

		record = Ext.create( store.model.modelName , {
			new_invc_numb	: new_invc_numb,
			smpl_dvcd		: 2,
			modify			: 'Y',
		});
		store.add(record);
		record.commit();
	},

	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records.length != 0){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove(records);
					}
				}
			});
		}
	},

});
