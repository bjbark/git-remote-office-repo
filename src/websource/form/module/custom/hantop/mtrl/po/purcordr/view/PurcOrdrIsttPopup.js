Ext.define('module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrIsttPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcordr-istt-popup',

	title		: '입고등록',
	closable	: true,
	autoShow	: true,
	width		: 230 ,
	height		: 140,
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
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '수주번호',
									name		: 'invc_numb',
									xtype		: 'textfield',
									itemId		: 'invc_numb',
									width		: 250,
									hidden		: true
								},{ fieldLabel	: '입고일자',
									xtype		: 'datefield',
									name		: 'invc_date',
									width		: 160,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								},{ fieldLabel	: '창고',
									xtype		: 'popupfield',
									name		: 'wrhs_name',
									pair		: 'wrhs_idcd',
									clearable	: true,
									width		: 190,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-wrhs-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records, nameField, pairField) {
											console.log(records);
											nameField.setValue(records[0].get('wrhs_name'));
											pairField.setValue(records[0].get('wrhs_idcd'));
										}
									}
								},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
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
			master	= Ext.ComponentQuery.query('module-purcordr-lister-master')[0]
		;
		if(values.invc_date==''||values.invc_date==null){
			Ext.Msg.alert("알림","입고일자를 반드시 입력해주십시오.");
		}if(values.wrhs_idcd==''||values.wrhs_idcd==null){
			Ext.Msg.alert("알림","창고를 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hantop/mtrl/po/purcordr/set/istt2.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: values.invc_numb,
						invc_date	: values.invc_date,
						wrhs_idcd	: values.wrhs_idcd,
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd
					})

				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "입고접수가 완료 되었습니다.");
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
