Ext.define('module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkWorkerEditor2', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-purcbillwork-worker-editor2',
	header	: false,
	height	: 50,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 110,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
			items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '5 0 0 -18',
						items : [
						{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '0 0 0 0',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','발행일자'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											labelWidth	: 79,
											width		: 183,
											margin		: '6 0 0 0',
											root		: true,
											value		: Ext.Date.getFirstDateOfMonth(new Date())
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											labelWidth	: 15,
											margin		: '6 0 0 0',
											width		: 120,
											value		: new Date()
										}
									]
								}
							]
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">홈텍스자료  가져오기</span>',
							xtype		: 'button',
							width		: 160,
							height		: 25,
							margin		: '5 0 0 100',
							cls			: 'button-style',
							action		: 'selectAction2'
						}
					]
				}
			]
		};
		return item;
	}
});
