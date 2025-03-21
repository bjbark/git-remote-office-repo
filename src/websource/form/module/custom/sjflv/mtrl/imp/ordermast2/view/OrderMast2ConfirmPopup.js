Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2ConfirmPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast2-confirm-popup',

	title		: '오더 확정',
	closable	: true,
	autoShow	: true,
	width		: 240 ,
	height		: 110,
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
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{ fieldLabel	: 'Order 확정일',
							xtype		: 'datefield',
							name		: 'cofm_date',
							value		: new Date(),
							width		: 190,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
//						},{	xtype:'textfield', name : 'invc_numb',value : me.params.data.ordr_numb,hidden:true
//						},{	xtype:'textfield', name : 'amnd_degr',value : me.params.data.amnd_degr,hidden:true
//						},{	xtype:'textfield', name : 'updt_idcd',value : _global.login_pk ,hidden:true
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

//		if(values.cofm_date==''||values.cofm_date==null){
//			Ext.Msg.alert("알림","Order 확정일을 반드시 입력해주십시오.");
//			return;
//		}

		var a = "", cnt =  popup.params.length;
		a += "{ 'cofm_date' : '"+values.cofm_date+"', 'updt_idcd': '"+_global.login_pk+"', 'records':[";

		var i = 0;
		console.log(record);

		Ext.each(popup.params,function(record){
			a += "{'invc_numb' : '"+record.get('ordr_numb')+"'}";
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
			url		: _global.location.http() + '/custom/sjflv/mtrl/imp/ordermast2/set/confirm.do',
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
