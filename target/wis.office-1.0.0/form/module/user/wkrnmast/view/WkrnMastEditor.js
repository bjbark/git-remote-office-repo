Ext.define('module.user.wkrnmast.view.WkrnMastEditor', { extend : 'Axt.form.Editor',

	alias: 'widget.module-wkrnmast-editor',

	title        : Language.get( 'wkrn_mast' , '직급 정보'),
	height       : 250,
	collapsible  : true,
	collapsed    : true ,
	defaultFocus : 'wkrn_name',
	/**
	 * 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.callParent(arguments);
	},
	/**
	 * 덕바를 생성 하여 에디터 하단에 체결
	 */
	createDock : function () {
		var me = this,
			item = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->', '-',
				{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
				{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'},'-'
			]
		};
		return item;
	},

	/**
	 * 에이터의 좌측 패널
	 */
	createWest : function () {
		var item = {
			xtype		: 'form-panel',
			dock		: 'left',
			width		: 330,
			bodyStyle	: { padding: '5px' },
			fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
			items		: [
				{	xtype	: 'fieldset',
					layout	: 'hbox'    ,
					padding	: '0'       ,
					border	:  0        ,
					margin	: '0 0 5 0' ,
					items	: [
						{	fieldLabel		: Language.get( 'wkrn_code', '직급코드' ),
							name			: 'wkrn_code',
							xtype			: 'textfield' ,
							width			: 240         ,
							allowBlank		: false       ,
							emptyText		: Const.invalid.emptyValue
						},{	name			: 'line_stat'  ,
							xtype			: 'lookupfield',
							editable		: false ,
							lookupValue		: resource.lookup('line_stat'),
							width			: 70          ,
							margin			: '0 0 0 5'
						}
					]
				},{
					fieldLabel		: Language.get( 'wkrn_name', '직급명' ),
					name			: 'wkrn_name',
					xtype			: 'textfield',
					allowBlank		: false,
					emptyText		: Const.invalid.emptyValue
				},{	fieldLabel		: Language.get( 'user_memo', '메모사항' ),
					name			: 'user_memo' ,
					xtype			: 'textarea' ,
					height			: 130
				}
			]
		};
		return item;
	}

	/**
	 * 에이터의 우측 패널, 이곳은 탭으로 구성한다.
	 */
//	createTabs : function () {
//		var me = this, tabs =
//		{
//			xtype : 'tabpanel',
//			region : 'center',
//			style : 'margin-left : 1px; ',
//			plain: true,
//			items:
//			[
//			]
//		};
//		return tabs;
//	}
});

