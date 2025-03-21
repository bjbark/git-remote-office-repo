Ext.define('module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-noteiomy-popup',

	title		: '어음입금 등록',
	closable	: true,
	autoShow	: true,
	width		: 380 ,
	height		: 230,
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
		var me   = this,
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
		console.log(me);
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -5',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							margin		: '0 0 0 10',
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '입금일자',
									xtype		: 'datefield',
									name		: 'iomy_date',
									width		: 160,
									value		: new Date(),
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: 'invoice',
									name		: 'invc_numb',
									xtype		: 'textfield',
									itemId		: 'invc_numb',
									width		: 250,
									hidden		: true
								},{ fieldLabel	: '거래처',
									xtype		: 'textfield',
									name		: 'cstm_name',
									itemId		: 'cstm_name',
									width		: 200,
									fieldCls	: 'readonlyfield',
									readOnly	: true
								},{ fieldLabel	: '어음번호',
									xtype		: 'textfield',
									name		: 'stot_bass',
									itemId		: 'stot_bass',
									width		: 200,
									fieldCls	: 'readonlyfield',
									readOnly	: true
								},{ fieldLabel	: '입금액',
									xtype		: 'numericfield',
									name		: 'iomy_amnt',
									itemId		: 'iomy_amnt',
									width		: 160,
								},{ fieldLabel	: '비고',
									xtype		: 'textfield',
									name		: 'remk_text',
									itemId		: 'remk_text',
									width		: 330,
								},{ fieldLabel	: '금액',
									xtype		: 'numericfield',
									name		: 'plan_amnt',
									itemId		: 'plan_amnt',
									hidden		: true,
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
			master	= Ext.ComponentQuery.query('module-noteiomy-lister')[0]
		;

		if(values.plan_amnt < values.iomy_amnt){
			Ext.Msg.alert("알림","어음발행금액보다  입금액이 더 많습니다. 다시입력해주세요.")
			return;
		}

		if(values.iomy_amnt==''||values.iomy_amnt==null){
			Ext.Msg.alert("알림","입금액을 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/sjflv/sale/sale/noteiomy/set/update.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: values.invc_numb,
						iomy_date	: values.iomy_date,
						iomy_amnt	: values.iomy_amnt,
						remk_text	: values.remk_text,
					})

				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "입금 등록이 완료 되었습니다.");
					master.getStore().reload();
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
	}
	});
