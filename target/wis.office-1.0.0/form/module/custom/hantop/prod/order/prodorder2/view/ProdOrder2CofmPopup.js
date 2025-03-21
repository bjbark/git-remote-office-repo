Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2CofmPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prodorder2-cofm-popup',

	title		: '',
	closable	: true,
	autoShow	: true,
	width		: 200 ,
	height		: 110,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.title = me.popup.params.title;
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
						{	text : '<span class="write-button">확인</span>', scope: me,handler: me.callAction, cls: 'button-style'} ,
						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close, cls: 'button-style'} ,
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('','확정일자'),
									xtype		: 'datefield',
									name		: 'cofm_dttm',
									editable	:  false,
									value		: new Date(),
									labelWidth	: 80,
									width		: 180,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
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
	 * 발행 버튼 이벤트
	 */

	callAction: function(){
		var me		= this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			params	= me.popup.params,
			master	= Ext.ComponentQuery.query('module-prodorder2-lister-master')[0],
			cofm	= Ext.ComponentQuery.query('module-prodorder2-lister-cofm')[0]
		;
		console.log(params);
		var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });

		var _param = '{\'fix_yorn\':'+params.fix_yorn+',\'cofm_dttm\':'+values.cofm_dttm+',\'records\':'+params.invc_string+'}';
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/set/cofmcancel.do',
			params	: {
				token : _global.token_id,
				param : _param
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					master.getStore().reload();
					cofm.getStore().reload();
					me.close();
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});
	},
});
