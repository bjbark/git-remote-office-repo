Ext.define('module.basic.hldymast.view.HldyMastEditor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-hldymast-editor',
	height		: 210,

	collapsible	: true,
	collapsed	: true,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'}, '-'
				]
			}
		;
		return item;
	},
	/**
	 *
	 */
	createWest : function () {
		var item	= {
			xtype			: 'form-panel',
			dock			: 'left',
			width			: 360,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 340, labelWidth : 60, labelSeparator : '' },
			items			: [
				{	fieldLabel	: Language.get('bzpl','사업장'),
					xtype		: 'popupfield'	,
					name		: 'bzpl_name'	,
					pair		: 'bzpl_idcd'	,
					allowBlank	: false,
					editable	: true,
					clearable	: false ,
					enableKeyEvents : true,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-bzpl-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('bzpl_name'));
								pairField.setValue(records[0].get('bzpl_idcd'));
							}
						}
				},{	name	: 'bzpl_idcd', xtype : 'textfield' , hidden : true
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0', //-10
					items	: [
						{	fieldLabel	: '휴무일',
							name		: 'hldy_date',
							fieldCls	: 'requiredindex',
							readOnly	: false,
							xtype		: 'datefield',
							maxLength	: 200,
							width		: 280,
							allowBlank	: false,
							value		: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							emptyText	: Const.invalid.emptyValue,
							listeners	: {
								change	: function(self, newValue, oldValue, eOpts ) {
									var week = newValue.getDay()+1;
									self.up('form').down('[name=dywk_dvcd]').setValue( week.toString() );
								}
							}
						},{ xtype		: 'lookupfield',
							name		: 'line_stat',
							lookupValue	: resource.lookup('line_stat'),
							width		: 55,
							margin		: '0 0 0 5'
						}
					]
				},{	fieldLabel	: Language.get('hldy_name','휴일명'),
					xtype		: 'textfield',
					name		: 'hldy_name',
					width		: 340,
					allowBlank	: false
				},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0', //-10
					items		: [
						{	fieldLabel	: '요일',
							fieldCls	: 'readonlyfield' ,
							readOnly	: true   ,
							name		: 'dywk_dvcd',
							xtype		: 'lookupfield',
							editable	: false,
							lookupValue	: resource.lookup('dywk_dvcd'),
							width		: 170
						},{	fieldLabel	: '휴무구분',
							name		: 'hldy_type_dvcd',
							xtype		: 'lookupfield',
							editable	: false,
							lookupValue	: resource.lookup('hldy_type_dvcd'),
							width		: 170
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0', //-10
					items	: [
						{	fieldLabel	: Language.get('stnd_hldy_yorn','법정공휴'),
							xtype		: 'lookupfield',
							name		: 'stnd_hldy_yorn',
							width		: 170,
							lookupValue	: resource.lookup('yorn'),
						}
					]
				}
			]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me	= this,
			tabs	= {
				xtype  : 'tabpanel',
				region : 'center',
				plain  : true,
				margin : 0 ,
				items  : [ me.createTab1() ]
			};
		return tabs;
	},

	/*
	 *
	 */
	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' 		,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 120,
						flex		: 1
					}
				]
			}
		;
		return item;
	}
});

