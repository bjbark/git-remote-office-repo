Ext.define('module.custom.iypkg.sale.order.saleorder.view.SaleOrderOsttPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-iypkg-saleorder-ostt-popup',

	title		: '출하계획',
	closable	: true,
	autoShow	: true,
	width		: 200 ,
	height		: 150,
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
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							margin		: '20 0 0 10',
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '출하계획일',
									xtype		: 'datefield',
									name		: 'invc_date',
									width		: 160,
									value		: new Date(),
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: '계획수량',
									xtype		: 'numericfield',
									name		: 'trst_qntt',
									width		: 160,
									value		: me.popup.params.trst_qntt,
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
			chk = 0
		;
		if(values.invc_date==''||values.invc_date==null){
			Ext.Msg.alert("알림","출하계획일을 반드시 입력해주십시오.");
		}else if(values.trst_qntt<1){
			Ext.Msg.alert('알림','계획수량을 확인해주세요.');
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/iypkg/sale/order/saleorder/get/check_ostt.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb		: me.popup.params.invc_numb,
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_date		: values.invc_date
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
						console.log(result.records[0].cnt)
						if(result.records[0].cnt){
							chk = result.records[0].cnt;
						}
//						Ext.Msg.alert("알림", "출하계획 작성이 완료되었습니다.");
//						me.close();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			if(chk>0){
				Ext.Msg.alert('알림','이미 해당 날짜에 출하계획이 있습니다.');
				mask.hide();
				return;
			}
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/iypkg/sale/order/saleorder/set/boxx_to_ostt.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb		: me.popup.params.invc_numb,
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						crte_idcd		: _global.login_pk,
						invc_date		: values.invc_date,
						trst_qntt		: values.trst_qntt
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
						Ext.Msg.alert("알림", "출하계획 작성이 완료되었습니다.");
						me.close();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

			mask.hide();
		}
	}
});
