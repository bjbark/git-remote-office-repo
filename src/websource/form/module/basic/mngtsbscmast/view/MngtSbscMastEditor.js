Ext.define('module.basic.mngtsbscmast.view.MngtSbscMastEditor', { extend : 'Axt.form.Editor',

	alias: 'widget.module-mngtsbscmast-editor',

	title        : Language.get( '' , '관리 항목 정보'),
	height       : 220,
	collapsible  : true,
	collapsed    : true ,
	defaultFocus : 'base_name',
	/**
	 * 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
//		me.items = me.createTabs();
		me.callParent(arguments);
	},
	/**
	 */
	createDock : function () {
		var me = this,
			item = {
			xtype : 'toolbar',
			dock: 'bottom',
			items: [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action,cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action,cls: 'button-style' }, '-'
			]
		};
		return item;
	},

	/**
	 */
	createWest : function () {
		var me = this,
			item = {
			xtype : 'form-panel',
				dock : 'left',
				width : 340,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
				items : [
					{ 	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'mngt_sbsc_code', '관리항목코드' ),
								name		: 'mngt_sbsc_code',
								xtype		: 'textfield',
								allowBlank	: false,
								width		: 240,
								emptyText	: Const.invalid.emptyValue,
							},{	name		: 'line_stat',
								xtype		: 'lookupfield',
								editable	: false,
								lookupValue	: resource.getList('line_stat'),
								 labelWidth : 60,
								width		: 70,
								margin		: '0 0 0 5'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'mngt_sbsc_name', '관리항목명' ),
								name		: 'mngt_sbsc_name',
								xtype		: 'textfield',
								allowBlank	: false,
								labelWidth 	: 70,
								width		: 315,
								emptyText	: Const.invalid.emptyValue,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
						items	: [
							{	fieldLabel	: Language.get( 'user_memo', '메모' ),
								name		: 'user_memo' ,
								xtype		: 'textarea' ,
								height		: 80
							},{	xtype		: 'textfield',  name : 'site_id' , hidden: true, value: _global.app_site
							}
						]
					}
				]
			};
		return item;
	},

	/**
	 * 에이터의 우측 패널, 이곳은 탭으로 구성한다.
	 */
	createTabs : function () {
		var me = this, tabs =
		{
			xtype : 'tabpanel',
			region : 'center',
			style : 'margin-left : 1px; ',
			plain: true,
			items:
			[
		]
		};
		return tabs;
	}
});

