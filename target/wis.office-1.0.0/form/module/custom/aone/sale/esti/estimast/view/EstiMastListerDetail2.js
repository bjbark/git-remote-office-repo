Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail2', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-lister-detail2',
	store: 'module.custom.aone.sale.esti.estimast.store.EstiMastDetail2',

	selModel 	: { selType: 'rowmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function() {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'amnd_degr'		, width: 70 , align : 'center'	, text: Language.get('amnd_degr'	, '변경차수'	),
					},{	dataIndex:	'amnd_date'		, width: 90 , align : 'center'	, text: Language.get('amnd_date'	, '변경일자'	),
					},{	dataIndex:	'chge_cont'		, flex :  80, align : 'left'	, text: Language.get('chge_cont'	, '변경내용'	),
					},{	dataIndex:	'drtr_name'		, width : 100, align : 'left'	, text: Language.get('drtr_name'	, '담당자'		),
					},{	dataIndex:	'user_memo'		, flex :  40, align : 'left'	, text: Language.get(''	, '비고'	),
					}
				]
			};
		return item;
	},

	lineInsert : function (config) {
		var me		= this,
			store	= me.getStore(),
			record	= undefined,
			new_invc_numb
		;

		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/sjflv/sale/etc/smplmast/get/invc.do',
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
