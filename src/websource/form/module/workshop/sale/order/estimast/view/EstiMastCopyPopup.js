Ext.define('module.workshop.sale.order.estimast.view.EstiMastCopyPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-estimast-copy-popup',

	title		: '주문서 복사',
	closable	: true,
	autoShow	: true,
	width		: 280 ,
	height		: 180,
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
								{	fieldLabel	: '주문번호',
									name		: 'new_invc_numb',
									xtype		: 'textfield',
									width		: 250,
									readOnly	: false,
									value		: (me.popup.params.new_invc_numb?me.popup.params.new_invc_numb:'')
								},{ fieldLabel	: '거래처명',
									xtype		: 'textfield',
									name		: 'cstm_name',
									width		: 250,
									readOnly	: true,
									value		: (me.popup.params.cstm_name?me.popup.params.cstm_name:''),
								},{ fieldLabel	: '납기일자',
									xtype		: 'datefield',
									name		: 'deli_date',
									width		: 160,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: '주문번호',
									name		: 'invc_numb',
									xtype		: 'textfield',
									width		: 250,
									hidden		: true,
									value		: (me.popup.params.invc_numb?me.popup.params.invc_numb:'')
								},
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
			master	= Ext.ComponentQuery.query('module-estimast-lister-master')[0]
		;
		if(values.deli_date==''||values.deli_date==null){
			Ext.Msg.alert("알림","납기일자를 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hjsys/sale/order/estimast/set/acpt_copy.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						new_invc_numb	: values.new_invc_numb,
						invc_numb		: values.invc_numb,
						deli_date		: values.deli_date,
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						crte_idcd		: _global.login_pk
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "복사가 완료 되었습니다.");
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
