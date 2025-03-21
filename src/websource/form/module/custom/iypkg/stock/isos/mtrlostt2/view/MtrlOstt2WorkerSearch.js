Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2WorkerSearch', { extend: 'Axt.form.Search',

	alias	: 'widget.module-mtrlostt2-worker-search',
	height	: 50,
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
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 300, labelWidth : 40 , margin : '5 5 5 5'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', margin : '8 0 0 0', border : 0,
					items : [
						{	fieldLabel	: Language.get('','출고일자'),
							xtype		: 'betweenfield',
							name		: 'ostt_date',
							width		: 150,
							labelWidth	: 50,
							root		: true,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							clearable	: true
						},{	fieldLabel	: Language.get('','창고'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true,
							width		: 200,
							labelWidth	: 50,
							name		: 'wrhs_name',
							pair		: 'wrhs_idcd',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-wrhs-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0'},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('wrhs_name'));
									pairField.setValue(records[0].get('wrhs_idcd'));
								}
							}
						},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
			return item;
	}
});
