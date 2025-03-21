Ext.define('module.custom.sjflv.sale.order.estimast2.view.EstiMast2PrintPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-estimast2-print-popup',

	title		: '견적복사',
	closable	: true,
	autoShow	: true,
	width		: 250 ,
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
			margin	: '15 7 0 10',
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
								{	fieldLabel	: Language.get('mony_yorn','금액 여부'),
									name		: 'mony_yorn',
									xtype		: 'lookupfield',
									lookupValue	: [['0','단가'],['1','금액']],
									value		: '0',
									width		: 200,
								},{	fieldLabel	: Language.get('vatx_yorn','부가세 여부'),
									name		: 'vatx_yorn',
									xtype		: 'lookupfield',
									lookupValue	: resource.lookup('yorn'),
									value		: '1',
									width		: 200,
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
			jrf  = 'EstiReport_Sjflv.jrf',
			jrf2 = 'EstiReport_Sjflv_pric.jrf',
			jrf3 = 'EstiReport_Sjflv_no_vatx.jrf',
			jrf4 = 'EstiReport_Sjflv_pric_no_vatx.jrf',
			resId =_global.hq_id.toUpperCase()
		;

		var err_msg = "";

		var invc_numb = me.popup.params.invc_numb;
		var arg =	'invc_numb~'+invc_numb+'~';

		var url  = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var url2 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var url3 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf3+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var url4 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf4+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

		if(values.mony_yorn === '0' && values.vatx_yorn === '1'){
			// 단가  + 부가세 별도
			url2	:  window.open(_global.location.http()+encodeURI(url2),'test','width=1400,height=800');
		}else if(values.mony_yorn === '1' && values.vatx_yorn === '1'){
			// 금액 + 부가세 별도
			url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800');
		}else if(values.mony_yorn === '0' && values.vatx_yorn === '0'){
			// 단가 + 부가세 없음
			url2	:  window.open(_global.location.http()+encodeURI(url4),'test','width=1400,height=800');
		}else{
			// 금액 + 부가세 없음
			url	:  window.open(_global.location.http()+encodeURI(url3),'test','width=1400,height=800');
		}
		me.close();
		return win;
	}
});
