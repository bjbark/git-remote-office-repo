Ext.define('module.project.sscdmast.view.SscdMastEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-sscdmast-editor',
	height : 254,
	layout : {
		type: 'border'
	},

	title        : Language.get('code_info','시스템코드 정보'),
	collapsible  : true       ,
	collapsed    : true       ,
	defaultFocus : 'sscd_name'  ,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 330,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('sscd_code','코드'),
								name		: 'sscd_code'   ,
								xtype		: 'textfield'   ,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 255
							},{	name		: 'sscd_idcd'  , xtype : 'textfield' , hidden : true
							},{	xtype		: 'lookupfield',
								name		: 'line_stat'  ,
								lookupValue	: resource.lookup('line_stat'),
								width		: 55           ,
								margin		: '0 0 0 5'
							}

						]
					},{ fieldLabel	: Language.get('lang_dvcd','언어구분'),
						xtype		: 'lookupfield',
						name		: 'lang_dvcd'  ,
						lookupValue	: resource.lookup('lang_dvcd'),
					},{	xtype		: 'textfield',
						name		: 'sscd_name',
						fieldLabel	: Language.get('sscd_name','코드이름'),
						allowBlank	: false,
						emptyText	: Const.invalid.emptyValue
					},{	fieldLabel	: Language.get('user_memo','메모사항'),
						name		: 'user_memo' ,
						xtype		: 'textarea'  ,
						height		: 135
					}
				]
			}
		;
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			item = {
				xtype		: 'tabpanel',
				region		: 'center',
				margin		: 0 ,
				plain		: true ,
				items		: [ me.createTab1() ]
			}
		;
		return item;
	},
	/**
	 *
	 */
	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('addon_info','코드항목'),
				xtype		: 'form-panel' ,
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'sbsc_valu' ,
						xtype		: 'textarea',
						emptyText	: 'key : value  형식으로 작성 하시기 바랍니다.',
						height		: 167 ,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lkup_valu' ,
						xtype		: 'textarea',
						readOnly	: true,
						//width		:100
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});

