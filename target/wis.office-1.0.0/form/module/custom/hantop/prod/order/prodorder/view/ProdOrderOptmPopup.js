Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderOptmPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prodorder-optm-popup',

	title		: '',
	closable	: true,
	autoShow	: true,
	width		: 220 ,
	height		: 200,
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
								{	fieldLabel	: Language.get('item_idcd','프로파일'),
									xtype		: 'textfield',
									name		: 'item_idcd',
									editable	:  false,
									readOnly	: true,
									labelWidth	: 80,
									value		: me.popup.params.item_idcd,
									width		: 180,
								},{	fieldLabel	: Language.get('bsmt_leng','표준길이'),
									xtype		: 'numericfield',
									name		: 'bsmt_leng',
									value		: me.popup.params.bsmt_leng,
									editable	:  false,
									readOnly	: true,
									labelWidth	: 80,
									width		: 180,
								},{	fieldLabel	: Language.get('bar_leng','투입길이'),
									xtype		: 'numericfield',
									name		: 'bar_leng',
									value		: me.popup.params.bsmt_leng,
									labelWidth	: 80,
									width		: 180,
								},{	fieldLabel	: Language.get('calc','계산단위'),
									xtype		: 'lookupfield',
									name		: 'calc',
									lookupValue	: [['1','프로파일 전체'],['2','해당 BAR']],
									labelWidth	: 80,
									width		: 180,
									listeners	:{
										change:function(field,val){
											if(val == 1){
												me.down('[name=ivst_ordr]').setValue('');
											}else if(val == 2){
												var orgn =	me.down('[name=orgn_ivst_ordr]').getValue();

												me.down('[name=ivst_ordr]').setValue(orgn);
											}
										}
									}
								},{ xtype : 'textfield', name : 'ivst_ordr'      ,hidden:true
								},{ xtype : 'textfield', name : 'orgn_ivst_ordr' ,value:me.popup.params.orgn_ivst_ordr,hidden:true
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
			detail	= Ext.ComponentQuery.query('module-prodorder-lister-cofmdetail2')[0]
		;
		var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });

		var _param = '{\'item_idcd\':\''+values.item_idcd+'\',\'bar_leng\':\''+values.bar_leng+'\',\'ivst_ordr\':\''+values.ivst_ordr+'\',\'records\':'+params.invc_string+'}';
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hntop/prod/order/prodorder/set/optm.do',
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
					detail.getStore().reload();
					mask.hide();
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
