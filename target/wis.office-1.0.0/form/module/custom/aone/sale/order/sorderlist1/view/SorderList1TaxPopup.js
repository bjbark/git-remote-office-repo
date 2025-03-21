Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1TaxPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sorderlist1-tax-popup',

	title		: '청구내용 입력',
	closable	: true,
	autoShow	: true,
	width		: 530 ,
	height		: 120,
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
		var me   = this,
			form = {
					xtype		: 'form-panel',
					border		: false,
					layout		: { type: 'vbox', align: 'stretch' } ,
					items		: [
						{	xtype  : 'panel',
							border : 0,
							margin : '10 0 0 0',
							items  : [
								{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items : [
										{	fieldLabel  : Language.get('','세금계산서 발행유무'),
											xtype       : 'checkboxfield',
											name        : 'bill_publ_yorn',
											labelSeparator: '',
											labelWidth  : 100,
											margin      : '5 20 0 20',
											allowBlank  : true,
											value		: me.popup.param.bill_publ_yorn
										},{ fieldLabel  : Language.get('bill_date','청구일'),
											xtype       : 'datefield',
											name        : 'bill_date',
											width       : 150,
											labelWidth  : 35,
											margin      : '5 0 0 10',
											format      : Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											editable    : false,
											fieldCls    : 'requiredindex',
											value		: me.popup.param.bill_date?me.popup.param.bill_date:new Date()
										},{	fieldLabel  : Language.get('bill_amnt','청구금액'),
											xtype       : 'numericfield',
											name        : 'bill_amnt',
											width       : 160,
											labelWidth  : 50,
											margin      : '5 0 0 10',
											fieldCls    : 'requiredindex',
											format      : '#,##0',
											value		: me.popup.param.bill_amnt?me.popup.param.bill_amnt:0
										},{	fieldLabel	: 'AoneCode',
											name		: 'invc_numb',
											xtype		: 'textfield',
											itemId		: 'invc_numb',
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											value		: me.popup.param.invc_numb,
											width		: 170,
											hidden		: true
										},{	fieldLabel	: 'AoneCode',
											name		: 'amnd_degr',
											xtype		: 'textfield',
											itemId		: 'amnd_degr',
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											value		: me.popup.param.amnd_degr,
											width		: 170,
											hidden		: true
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
				baseform = me.down('form'),
				records   = baseform.getRecord(),
				values   = baseform.getValues(),
				master	= Ext.ComponentQuery.query('module-sorderlist1-lister-master1')[0],
				select	= master.getSelectionModel().getSelection()
			;
			if (select.length > 0) {
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
				var record = [];
				Ext.each(select,function(rec){
					record.push(rec.data);
				});

				if(values.bill_amnt==''||values.bill_amnt==null){
					Ext.Msg.alert("알림","청구금액을 반드시 입력해주십시오.");
				}else{
					mask.show();
					Ext.Ajax.request({
						url     : _global.location.http() + '/custom/aone/sale/order/sorderlist1/set/setTax.do',
						params  : {
							 token : _global.token_id,
							 param : JSON.stringify({
									records         : record,
									bill_publ_yorn  : values.bill_publ_yorn,
									bill_date       : values.bill_date,
									bill_amnt       : values.bill_amnt,
								})
						},
						async   : false,
						method  : 'POST',
						success : function(response, request) {
							var result = Ext.decode(response.responseText);
							Ext.Msg.alert("알림", "청구내용 입력이 완료 되었습니다.");
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
							me.close();
						}
					});
					mask.hide();
				}
			}
		}
	});
