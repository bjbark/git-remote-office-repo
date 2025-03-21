Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetailEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-prodorder-lister-detaileditor',
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 45,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
					items : [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '3 0 5 0',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0,
								items : [
									{	xtype		: 'checkbox',
										boxLabel	: '틀',
										name		: 'bfsf_dvcd',
										labelWidth	: 30,
										width		: 60,
										value		: true,
										margin		: '5 0 0 0',
										inputValue	: 'BF',
									},{	xtype		: 'checkbox',
										boxLabel	: '짝',
										name		: 'bfsf_dvcd',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: 'SF',
									},{	xtype		: 'checkbox',
										boxLabel	: '망',
										name		: 'bfsf_dvcd',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: 'MF',
									},{	xtype		: 'checkbox',
										boxLabel	: '틀보강재',
										name		: 'bfsf_dvcd',
										labelWidth	: 20,
										width		: 75,
										value		: true,
										inputValue	: 'BFRN',
									},{	xtype		: 'checkbox',
										boxLabel	: '짝보강재',
										name		: 'bfsf_dvcd',
										labelWidth	: 20,
										width		: 75,
										value		: true,
										inputValue	: 'SFRN',
									},{	xtype		: 'checkbox',
										boxLabel	: '망보강재',
										name		: 'bfsf_dvcd',
										labelWidth	: 20,
										width		: 75,
										value		: true,
										inputValue	: 'MFRN',
									},{	xtype		: 'checkbox',
										boxLabel	: 'MC',
										name		: 'bfsf_dvcd',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: 'MC',
									},{	xtype		: 'checkbox',
										boxLabel	: 'GB',
										name		: 'bfsf_dvcd',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: 'GB',
									},{	xtype		: 'checkbox',
										boxLabel	: '유리',
										name		: 'bfsf_dvcd',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: 'GLSS',
									}
								]
							}
						]
					},{	text		: '<span class="btnTemp" style="font-size:1.3em">새로고침</span>',
						xtype		: 'button',
						width		: 80,
						height		: 30,
						margin		: '5 0 0 8',
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
