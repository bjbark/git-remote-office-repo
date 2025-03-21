Ext.define('module.basic.refnmast.view.RefnMastEditor', { extend : 'Axt.form.Editor',

	alias: 'widget.module-refnmast-editor',

	title        : Language.get( '' , '기초 코드 정보'),
	height       : 400,
	collapsible  : true,
	collapsed    : true ,
	defaultFocus : 'base_name',
	/**
	 * 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		//me.items = me.createWest();
		me.items = me.createTabs();
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
				width : 820,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				items : [
					{ 	xtype	: 'fieldset',
						layout	: 'hbox'    ,
						padding	: '0'       ,
						border	:  0        ,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'refn_code', '코드' ),
								name		: 'refn_code'   ,
								xtype		: 'textfield' ,
								allowBlank	: false       ,
								width		: 240         ,
								emptyText	: Const.invalid.emptyValue,
								maxLength	: 4
							},{	name		: 'line_stat'  ,
								xtype		: 'lookupfield',
								editable	: false,
								lookupValue	: resource.getList('line_stat'),
								width		: 70          ,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel		: Language.get( 'refn_cont_1fst', '코드내용#1' ),
						name			: 'refn_cont_1fst' ,
						xtype			: 'textarea',
						width			: 800 ,
//						height			: 150,
					},{	fieldLabel		: Language.get( 'refn_cont_2snd', '#2' ),
						name			: 'refn_cont_2snd' ,
						xtype			: 'textarea',
						width			: 800 ,
//						height			: 150,
					},{	fieldLabel		: Language.get( 'refn_cont_3trd', '#3' ),
						name			: 'refn_cont_3trd' ,
						xtype			: 'textarea',
						width			: 800 ,
//						height			: 150,
					},{	fieldLabel		: Language.get( 'refn_cont_4frt', '#4' ),
						name			: 'refn_cont_4frt' ,
						xtype			: 'textarea',
						width			: 800 ,
//						height			: 150,
					},{	fieldLabel		: Language.get( 'refn_cont_5fit', '#5' ),
						name			: 'refn_cont_5fit' ,
						xtype			: 'textarea' ,
						width			: 800 ,
//						height			: 150,
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
			[ me.createTab1()
			]
		};
		return tabs;
	},
	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0	,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '',
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 155,
						flex		: 1
					}
				]
			}
		;
		return item;
	}
});

