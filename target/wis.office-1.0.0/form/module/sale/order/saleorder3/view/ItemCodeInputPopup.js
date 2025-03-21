Ext.define('module.sale.order.saleorder3.view.ItemCodeInputPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-itemcode-input-popup',

	title		: '품목코드 간편 등록',
	closable	: true,
	autoShow	: true,
	width		: 280 ,
	height		: 320 ,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'item_name',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
		Ext.Ajax.request({
			url		: _global.location.http() + '/item/itemmast/get/itemCode.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
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
					if(result.records.length>0){
						var item_code = result.records[0].item_code;
						me.down('[name=item_code]').setValue(item_code);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

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
			height		: 400 ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '품목코드',
									name		: 'item_code',
									xtype		: 'textfield',
									itemId		: 'item_code',
									width		: 250,
									readOnly	: true
								},{ fieldLabel	: '품명',
									xtype		: 'textfield',
									name		: 'item_name',
									itemId		: 'item_name',
									width		: 250,
								},{ fieldLabel	: '규격',
									xtype		: 'textfield',
									name		: 'item_spec',
									itemId		: 'item_spec',
									width		: 250,
								},{ fieldLabel	: '나사호칭',
									xtype		: 'numericfield',
									name		: 'bolt_name',
									itemId		: 'bolt_name',
									width		: 250,
								},{ fieldLabel	: 'pitch',
									xtype		: 'numericfield',
									name		: 'bolt_pich',
									itemId		: 'bolt_pich',
									width		: 250,
								},{ fieldLabel	: '고정길이',
									xtype		: 'numericfield',
									name		: 'leng_valu',
									itemId		: 'leng_valu',
									width		: 250,
								},{ fieldLabel	: '산깊이',
									xtype		: 'numericfield',
									name		: 'mntn_dpth',
									itemId		: 'mntn_dpth',
									width		: 250,
								},{ fieldLabel	: '소재경',
									xtype		: 'numericfield',
									name		: 'mtrl_dimt',
									itemId		: 'mtrl_dimt',
									width		: 250,
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
			master	= Ext.ComponentQuery.query('module-saleorder3-worker-search')[0]
		;
		if(values.item_name==''||values.item_name==null){
			Ext.Msg.alert("알림","품명을 반드시  입력해주십시오.");
			return;
		};
		if(values.item_spec==''||values.item_spec==null){
			Ext.Msg.alert("알림","규격을 반드시  입력해주십시오.");
			return;
		};
		if(values.bolt_name==''||values.bolt_name==null){
			Ext.Msg.alert("알림","나사 호칭을 반드시  입력해주십시오.");
			return;
		};
		if(values.bolt_pich==''||values.bolt_pich==null||values.bolt_pich==0){
			Ext.Msg.alert("알림","나사 피치를 반드시  입력해주십시오.");
			return;
		};
		if(values.leng_valu==''||values.leng_valu==null||values.leng_valu==0){
			Ext.Msg.alert("알림","고정길이를 반드시  입력해주십시오.");
			return;
		};

		resource.keygen({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			object	: resource. keygen,
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'item_mast'
				})
			 },
			async  : false,
			callback : function( keygen ) {
				if (keygen.success) {
					me.down('[name=item_code]'	).setValue(keygen.records[0].seq);
					values.item_code = keygen.records[0].seq;
					master.down('[name=item_code]'	).setValue(keygen.records[0].seq);
				} else {
					Ext.Msg.alert("error", keygen.message  );
					return;
				}
			}
		});

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/item/itemmast/set/simple.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					item_idcd	: values.item_code,
					item_code	: values.item_code,
					item_name	: values.item_name,
					item_spec	: values.item_spec,
					acct_bacd	: '3000',
					bolt_name	: values.bolt_name,
					bolt_pich	: values.bolt_pich,
					leng_valu	: values.leng_valu,
					mntn_dpth	: values.mntn_dpth,
					mtrl_dimt	: values.mtrl_dimt,
					stor_id		: _global.stor_id,
					hqof_idcd	: _global.hqof_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				master.down('[name=item_name]'	).setValue(values.item_name);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
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
