Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkPricPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sjflv-goodsosttwork-pric-popup',

	title		: '운송비등록',
	closable	: true,
	autoShow	: true,
	width		: 350 ,
	height		: 200,
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
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' , margin : '10 0 0 30'},
							items		: [
								,{	fieldLabel	: Language.get('ostt_trnt_dvcd',''),
									xtype		: 'textfield',
									name		: 'invc_numb',
									itemId		: 'invc_numb',
									labelWidth	: 80,
									width		: 175,
									hidden		: true,
								},{	fieldLabel	: Language.get('ostt_trnt_dvcd','출고운송방법'),
									xtype		: 'lookupfield',
									name		: 'ostt_trnt_dvcd',
									itemId		: 'ostt_trnt_dvcd',
									lookupValue : resource.lookup('ostt_trnt_dvcd'),
									labelWidth	: 80,
									width		: 175,
								},{	fieldLabel	: Language.get('ostt_trnt_amnt','출고운송비용'),
									xtype		: 'numericfield',
									name		: 'ostt_trnt_amnt',
									itemId		: 'ostt_trnt_amnt',
									labelWidth	: 80,
									width		: 175,
								},{	fieldLabel	: Language.get('remk_text','출고운송비고'),
									xtype		: 'textfield',
									name		: 'remk_text',
									itemId		: 'remk_text',
									labelWidth	: 80,
									width		: 300,
									maxLength	: 100,
									maxLengthText: '한글 100자 이내로 작성하여 주십시오.'
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
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-goodsosttwork-lister-master1')[0]
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/stock/goodsosttwork/set/setTrntCost.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb		: values.invc_numb,
					ostt_trnt_dvcd	: values.ostt_trnt_dvcd,
					ostt_trnt_amnt	: values.ostt_trnt_amnt,
					remk_text		: values.remk_text,
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
					Ext.Msg.alert("알림", "운송비 등록이 완료 되었습니다.");
					master.getStore().reload();
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});
	}
});
