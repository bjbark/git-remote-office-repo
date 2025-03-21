Ext.define('module.custom.sjflv.sale.saleorder.view.SaleOrderPrintPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-saleorder-print-popup',

	title		: '거래명세서 출력',
	closable	: true,
	autoShow	: true,
	width		: 220 ,
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
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('invc_numb','수주번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									itemId		: 'invc_numb',
									labelWidth	: 80,
									width		: 160,
									hidden		: true
								},{ fieldLabel	: '거래일자',
									xtype		: 'datefield',
									name		: 'invc_date',
									value		: new Date(),
									margin		: '5 0 0 20',
									width		: 160,
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
	 * 수령 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-sjflv-saleorder-lister-master')[0],
			record	= master.getSelectionModel().getSelection(),
			jrf = 'Invoice_sjflv_acpt.jrf',
			resId =_global.hq_id.toUpperCase()
		;


		if (record) {
			var a = "";
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a+= "[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':\''+record[i].get('line_seqn')+'\',\'invc_date\':\''+values.invc_date+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			me.hide();
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},
});
