Ext.define('module.sale.order.saleorder.view.SaleOrderDeliPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-saleorder-deli-popup',

	title		: '배송지 등록',
	closable	: true,
	autoShow	: true,
	width		: 420,
	height		: 220,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items 		: [me.editorForm() ],
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('dely_cstm_name','납품처명'),
							xtype		: 'textfield',
							name		: 'dely_cstm_name',
							width		: 200,
							labelWidth	: 80,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
						},{	fieldLabel	: Language.get('dlvy_drtr_name','납품 담당자명'),
							xtype		: 'textfield',
							name		: 'dlvy_drtr_name',
							width		: 200,
							labelWidth	: 80,
							allowBlank	: false,
						},{	fieldLabel	: Language.get('dlvy_addr_1fst', '배송주소1' ),
							xtype		: 'textfield',
							name		: 'dlvy_addr_1fst',
							width		: 300,
							labelWidth	: 80,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
						},{	xtype		: 'textfield',
							name		: 'dlvy_cstm_idcd',
							hidden		: true,
							value		: me.popup.param.dlvy_cstm_idcd,
						},{	xtype		: 'textfield',
							name		: 'cstm_idcd',
							hidden		: true,
							value		: me.popup.param.cstm_idcd,
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			popup	= Ext.ComponentQuery.query('lookup-cstm-deli-popup')[0],
			grid	= popup.down('grid'),
			store	= grid.getStore()
		;
		var dely_cstm_name = values.dely_cstm_name;
		var dlvy_drtr_name = values.dlvy_drtr_name;
		var dlvy_addr_1fst = values.dlvy_addr_1fst;
		var dlvy_cstm_idcd = values.dlvy_cstm_idcd;
		var cstm_idcd = values.cstm_idcd;

		if(dely_cstm_name == null || dely_cstm_name == '') {
			Ext.Msg.alert("알림","납품처명을 입력해주십시오.");
			return;
		}
		if(dlvy_drtr_name == null || dlvy_drtr_name == '') {
			Ext.Msg.alert("알림","납품담담자명을 입력해주십시오.");
			return;
		}
		if(dlvy_addr_1fst == null || dlvy_addr_1fst == '') {
			Ext.Msg.alert("알림","배송주소를 입력해주십시오.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/order/saleorder/set/deliveryaddress.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					dlvy_cstm_idcd	: values.dlvy_cstm_idcd,
					dely_cstm_name	: values.dely_cstm_name,
					dlvy_drtr_name	: values.dlvy_drtr_name,
					dlvy_addr_1fst	: values.dlvy_addr_1fst,
					cstm_idcd		: values.cstm_idcd,
					line_seqn		: "1"
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

					store.load({
						params		: {param:JSON.stringify({cstm_idcd : cstm_idcd})},
						scope		: me,
						callback	: function(records, operation, success) {
						}
					});

					me.setResponse( {success : true , values :  values });

				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}
});
