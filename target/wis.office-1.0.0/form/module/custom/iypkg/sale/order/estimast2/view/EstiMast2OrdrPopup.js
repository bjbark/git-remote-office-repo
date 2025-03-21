Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2OrdrPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-estimast2-ordr-popup',

	title		: '주문 등록',
	closable	: true,
	autoShow	: true,
	width		: 250 ,
	height		: 130,
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
			margin	: '20 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 80, labelSeparator : '' },
							items		: [
								{ fieldLabel	: '납기일자',
									xtype		: 'datefield',
									name		: 'deli_date',
									itemId		: 'deli_date',
									width		: 200,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
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
			master	= Ext.ComponentQuery.query('module-estimast2-lister-master')[0],
			detail	= Ext.ComponentQuery.query('module-estimast2-lister-detail')[0],
			record =[]
		;

		if(values.deli_date==''){
			Ext.Msg.alert("알림","납기일자를 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Msg.confirm("확인", "주문등록을 하시겠습니까?", function(button) {
				if (button == 'yes') {

					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/estimast2/set/acpt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								records		: me.params.param,
								deli_date	: values.deli_date
							})
						},
						async : false,
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							me.setResponse( {success : true});
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							master.getStore().reload();
						},
						finished : function(results, record, operation){
							mask.hide();
						}
					});
				}
			});
		}
	}
});
