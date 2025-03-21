Ext.define('module.custom.sjflv.sale.sale.salearlist.view.SaleArListWorkerSearch', { extend: 'Axt.form.Search',

	alias	: 'widget.module-salearlist-worker-search',
	height	: 150,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest()] ;
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			height		: 150,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
					items : [
						{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '1 0 5 0',
							items : [
								{	xtype : 'fieldset', layout: 'hbox', border : 0,
									items : [
									 	{	fieldLabel	: Language.get('','거래처명'),
											xtype		: 'textfield',
											name		: 'cstm_name',
											readOnly	: true,
											labelWidth	: 60,
											margin		: '10 0 0 10',
											width		: 200,
//										},{	fieldLabel	: Language.get('','조회일자'),
//											xtype		: 'betweenfield',
//											name		: 'invc_date1',
//											pair		: 'invc_date2',
//											clearable	: true,
//											margin		: '10 0 0 20',
//											labelWidth	: 50,
//											width		: 146,
//											root		: true,
//											format		: Const.DATE_FORMAT_YMD_BAR,
//											submitFormat: Const.DATE_FORMAT_YMD,
//											value		: Ext.Date.getFirstDateOfMonth(new Date()),
//											listeners	: {
//												change : function(value){
//													var val  = value.getValue()
//														date = Ext.Date.getFirstDateOfMonth(new Date())
//													;
//													if(val == '' || val == null){
//														value.setValue(date);
//													}
//												}
//											}
//										},{	fieldLabel	: Language.get('','~'),
//											xtype		: 'betweenfield',
//											name		: 'invc_date2',
//											pair		: 'invc_date1',
//											margin		:'10 5 0 5',
//											clearable	: true,
//											width		: 101,
//											labelWidth	: 5,
//											format		: Const.DATE_FORMAT_YMD_BAR,
//											submitFormat: Const.DATE_FORMAT_YMD,
//											value		: Ext.Date.getLastDateOfMonth(new Date()),
//											listeners	: {
//												change : function(value){
//													var val  = value.getValue()
//														date = Ext.Date.getLastDateOfMonth(new Date())
//													;
//													if(val == '' || val == null){
//														value.setValue(date);
//													}
//												}
//											}
										},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
											xtype		: 'button',
											width		: 80,
											height		: 23,
											margin		: '10 0 0 180',
											cls			: 'button-style',
											action		: 'selectAction2'
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,
									items : [
									 	{	fieldLabel	: Language.get('','사업자번호'),
											xtype		: 'textfield',
											name		: 'buss_numb',
											readOnly	: true,
											labelWidth	: 60,
											margin		: '0 0 0 10',
											width		: 200,
										},{	fieldLabel	: Language.get('','대표자명'),
											xtype		: 'textfield',
											name		: 'boss_name',
											readOnly	: true,
											labelWidth	: 50,
											margin		: '0 0 0 20',
											width		: 146,
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,
									items : [
									 	{	fieldLabel	: Language.get('','전화번호'),
											xtype		: 'textfield',
											name		: 'tele_numb',
											readOnly	: true,
											labelWidth	: 60,
											margin		: '0 0 0 10',
											width		: 200,
										},{	fieldLabel	: Language.get('','메일주소'),
											xtype		: 'textfield',
											name		: 'mail_addr',
											readOnly	: true,
											labelWidth	: 50,
											margin		: '0 0 0 20',
											width		: 250,
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,
									items : [
									 	{	fieldLabel	: Language.get('','주소'),
											xtype		: 'textfield',
											name		: 'cstm_addr',
											readOnly	: true,
											labelWidth	: 60,
											margin		: '0 0 0 10',
											width		: 470,
										}
									]
								}
							]
						},
					]
				}
			]
		};
		return item;
	}
});
