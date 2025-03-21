Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2DatePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast2-date-popup',

	title		: '선적일정 등록',
	closable	: true,
	autoShow	: true,
	width		: 250 ,
	height		: 190,
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
						'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , handler : me.finishAction, cls: 'button-style' },
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
			margin	: '15 0 0 10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype		: 'form-panel',
					border		: 0,
					width		: 640,
					fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
					items		: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items	: [
								{	fieldLabel	: 'ETD',
									xtype		: 'datefield',
									name		: 'etdd',
									width		: 160,
									margin		: '0 0 10 0 ',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: me.popup.params.etdd
								},{ fieldLabel	: 'ETA',
									xtype		: 'datefield',
									name		: 'etaa',
									width		: 160,
									margin		: '0 0 10 0 ',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: me.popup.params.etaa
								},{ fieldLabel	: 'ECD',
									xtype		: 'datefield',
									name		: 'ecdd',
									width		: 160,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: me.popup.params.ecdd
								},{ fieldLabel	: 'ECD',
									xtype		: 'textfield',
									name		: 'ordr_numb',
									width		: 160,
									hidden		: true,
									value		: me.popup.params.ordr_numb
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
			baseform= me.up('form'),
			popup	= baseform.ownerCt,
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-ordermast2-lister-master')[0]
		;
		var a = "", cnt =  popup.params.length;
		a += "{ 'etdd' : '"+values.etdd+"', 'etaa' : '"+values.etaa+"','ecdd' : '"+values.ecdd+"', 'records':[";

		var i = 0;

		Ext.each(popup.params,function(record){
			a += "{'invc_numb' : '"+values.ordr_numb+"'}";
			if(i < cnt-1){
				a+=',';
			}else{
				a+="]}";
			}
			i++;
		});

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/mtrl/imp/ordermast2/set/date.do',
			params	: {
				token : _global.token_id,
				param : a
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				master.getStore().reload();
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					baseform.ownerCt.close();
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
