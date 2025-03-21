Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1MemoPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sorderlist1-memo-popup',

	title		: '반출 입력',
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
		me.items = [ me.createForm() ];
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
				items		: [me.editorForm()],
		};
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
								{	fieldLabel  : Language.get('tkot_date','반출일자'),
									xtype       : 'datefield',
									name        : 'tkot_date',
									width       : 220,
									labelWidth  : 100,
									fieldCls    : 'requiredindex',
									format      : Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: me.popup.param.records[0].tkot_date?me.popup.param.records[0].tkot_date:me.popup.param.records[0].invc_date
								},{	fieldLabel  : Language.get('tkot_text','반출내용'),
									xtype       : 'textarea',
									name        : 'tkot_text',
									width       : 300,
									height      : 100,
									labelWidth  : 100,
									fieldCls    : 'requiredindex',
									value		: me.popup.param.records[0].tkot_text
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
				record   = baseform.getRecord(),
				values   = baseform.getValues(),
				master	= Ext.ComponentQuery.query('module-sorderlist1-lister-master1')[0],
				select   = master.getSelectionModel().getSelection()
			;

//			if(values.tkot_text==''||values.tkot_text==null){
//				Ext.Msg.alert("알림","반출내용을 반드시 입력해주십시오.");
//				return;
//			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
				mask.show();


				Ext.Ajax.request({
					url     : _global.location.http() + '/custom/aone/sale/order/sorderlist1/set/setMemo.do',
					params  : {
						token   : _global.token_id,
						param   : JSON.stringify({
							tkot_date : values.tkot_date,
							tkot_text : values.tkot_text,
							records   : me.popup.param.records
						})
					},
					async   : false,
					method  : 'POST',
					success : function(response, request) {
						var result = Ext.decode(response.responseText);
						Ext.Msg.alert("알림", "반출내용 입력이 완료 되었습니다.");
						Ext.ComponentQuery.query('module-sorderlist1-lister-master1')[0].getStore().reload();
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
//			}
		}
	});
