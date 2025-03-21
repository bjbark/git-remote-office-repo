Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastAcptPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-estimast-acpt-popup',

	title		: '수주 등록',
	closable	: true,
	autoShow	: true,
	width		: 450,
	height		: 170,
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
						{	xtype : 'fieldset', layout: 'hbox', border : 0,
							items : [
								{	fieldLabel	: Language.get('invc_numb','견적번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									width		: 200,
									labelWidth	: 80,
									value		: me.param.invc_numb,
									fieldCls	: 'requiredindex',
									readOnly	: true,
								},{	xtype		: 'textfield',
									name		: 'amnd_degr',
									width		: 20,
									margin		: '1 0 0 1',
									value		: me.param.amnd_degr,
									fieldCls	: 'requiredindex',
									readOnly	: true,
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,
							items : [
								{	fieldLabel	: Language.get('acpt_invc_numb', '수주번호' ),
									xtype		: 'textfield',
									name		: 'acpt_invc_numb',
									width		: 200,
									labelWidth	: 80,
									value		: me.param.acpt_invc_numb,
									fieldCls	: 'requiredindex',
									readOnly	: true,
								},{	xtype		: 'lookupfield',
									name		: 'acpt_dvcd',
									margin		: '1 0 0 1',
									lookupValue	: resource.lookup('').concat(resource.lookup('acpt_dvcd').slice(0,1), resource.lookup('acpt_dvcd').slice(2,3), resource.lookup('acpt_dvcd').slice(4,5)),
									width		: 50,
									value		: '1000',
									editable	: false,
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,
							items : [
									{	fieldLabel	: Language.get('deli_date', '납기일자' ),
										xtype		: 'datefield',
										name		: 'deli_date',
										width		: 200,
										labelWidth	: 80,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: me.param.deli_date,
										fieldCls	: 'requiredindex',
										readOnly	: true,
								}
							]
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
			master	= Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			store	= master.getStore()
		;
		var invc_numb		= values.invc_numb;		// 견적번호
		var amnd_degr		= values.amnd_degr;		// 견적차수
		var acpt_invc_numb	= values.acpt_invc_numb;// 수주번호
		var acpt_dvcd		= values.acpt_dvcd;		// 수주구분
		var deli_date		= values.deli_date;		// 납기일자

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/aone/sale/estimast/set/acpt.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb	: values.invc_numb,
					amnd_degr	: values.amnd_degr,
					acpt_invc_numb	: values.acpt_invc_numb,
					acpt_dvcd	: values.acpt_dvcd,
					deli_date	: values.deli_date,
					login_id	: _global.login_id,
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
						params		: {param:JSON.stringify({})},
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
				Ext.Msg.alert("알림", "수주등록 되었습니다.");
			}
		});
	}
});
