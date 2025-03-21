Ext.define('module.mtrl.po.poplan.view.PoPlanOrderPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-poplan-order-popup',

	title		: '발주실행',
	closable	: true,
	autoShow	: true,
	width		: 300 ,
	height		: 150 ,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'clnt_name',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm() ];
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
			items : [ me.editorForm() ]
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
							width		: 640,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '', margin : '0 0 0 10'},
							items		: [

								{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('sale_drtr_name', '담당자' ),
											name		: 'drtr_name',
											pair		: 'drtr_idcd',
											xtype		: 'popupfield',
											width		: 200,
											editable	: true,
											enableKeyEvents : true,
											popup		: {
												widget	: 'lookup-user-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField ) {
														nameField.setValue(records[0].get('user_name'));
														pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{name : 'drtr_idcd', xtype	: 'textfield', hidden : true
										},
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('esti_date', '발주일자' ),
											name		: 'invc_date',
											xtype		: 'datefield',
											width		: 200,
											value		: new Date(),
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	fieldLabel	: Language.get('', 'invc' ),
											xtype		: 'textfield',
											name		: 'invc_numb',
											itemId		: 'invc_numb',
											hidden	: true
										},{	fieldLabel	: Language.get('', 'amd' ),
											xtype		: 'numericfield',
											name		: 'amnd_degr',
											itemId		: 'amnd_degr',
											hidden		: true
										},{	fieldLabel	: Language.get('', '항번' ),
											xtype		: 'numericfield',
											name		: 'line_seqn',
											itemId		: 'line_seqn',
											hidden	: true
										}
									]
								}
							]
						}
					]
				}
			],
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
			values	= baseform.getValues()
//			master	= Ext.ComponentQuery.query('module-saleorder3-worker-search')[0]
		;
		console.log(values.invc_numb);
		console.log(values.amnd_degr);
		console.log(values.line_seqn);
		if(values.drtr_idcd==''||values.drtr_idcd==null){
			Ext.Msg.alert("알림","담당자를 반드시  입력해주십시오.");
			return;
		};
		if(values.invc_date==''||values.invc_date==null){
			Ext.Msg.alert("알림","발주일자를 반드시  입력해주십시오.");
			return;
		};


//		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
//		mask.show();
//		Ext.Ajax.request({
//			url		: _global.location.http() + '/mtrl/po/poplan/set/order.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					invc_numb	: values.invc_numb,
//					amnd_degr	: values.amnd_degr,
//					line_seqn	: values.line_seqn,
//					item_name	: values.item_name,
//					drtr_idcd	: values.drtr_idcd,
//					invc_date	: values.invc_date,
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				master.down('[name=item_name]'	).setValue(values.item_name);
//				if	(!result.success ){
//					Ext.Msg.error(result.message );
//					return;
//				} else {
//					me.setResponse( {success : true , values :  values });
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//				mask.hide();
//			}
//		});
	}
});
