Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerLister2Search', { extend: 'Axt.form.Search',

	alias	: 'widget.module-purcbillwork-worker-lister2-search2',
	height	: 75,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px'},
			fieldDefaults: { width : 280 },
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0,
					items : [
						{	xtype : 'fieldset', layout: 'vbox', border : 0,
							items : [
								{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '10 11 5 0',
									items	: [
										{	fieldLabel	: Language.get('publ_date','발행일자'),
											xtype		: 'datefield',
											name		: 'publ_date',
											labelWidth	: 70,
											width		: 175,
											margin		: '0 0 0 2',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											readOnly	: true,
											fieldCls	: 'readonlyfield'
										},{	fieldLabel	: Language.get('txbl_seqn','일련번호'),
											xtype		: 'textfield',
											name		: 'txbl_seqn',
											margin		: '0 0 0 20',
											width		: 180,
											readOnly	: true,
											fieldCls	: 'readonlyfield'
										},{	fieldLabel	: Language.get('txbl_volm','권'),
											xtype		: 'textfield',
											name		: 'txbl_volm',
											labelWidth	: 55,
											width		: 105,
											readOnly	: true,
											fieldCls	: 'readonlyfield'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '0 11 5 0',
									items	: [
										{	fieldLabel	: Language.get('stot_dvcd','결제구분'),
											xtype		: 'lookupfield',
											margin		: '10 0 0 0',
											name		: 'stot_dvcd',
											lookupValue	: resource.lookup('stot_dvcd'),
											labelWidth	: 70,
											width		: 175,
											margin		: '0 0 0 2',
											fieldCls	: 'readonlyfield',
											readOnly	: true,
										},{	fieldLabel	: Language.get('rqod_rcvd_dvcd','청구/영수'),
											xtype		: 'lookupfield',
											margin		: '10 0 0 0',
											name		: 'rqod_rcvd_dvcd',
											lookupValue	: resource.lookup('rqod_rcvd_dvcd'),
											margin		: '0 0 0 20',
											width		: 180,
											readOnly	: true,
											fieldCls	: 'readonlyfield'
										},{	fieldLabel	: Language.get('txbl_honm','호'),
											xtype		: 'textfield',
											name		: 'txbl_honm',
											labelWidth	: 55,
											width		: 105,
											readOnly	: true,
											fieldCls	: 'readonlyfield'
										}
									]
								}
							]
						},{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '10 0 0 0',
							height: 96,
							items : [
								{	fieldLabel	: Language.get('remk_text','적요'),
									xtype		: 'textarea',
									name		: 'remk_text',
									labelWidth	: 40,
									width		: 350,
									height		: 50,
									readOnly	: true,
									fieldCls	: 'readonlyfield'
								}
							]
						}
					]
				}
			]
		};
	return item;
	},

});
