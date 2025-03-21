Ext.define('module.project.codeinfo.view.CodeInfoEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-codeinfo-editor',

	height : 254,
	layout : {
		type: 'border'
	},

	title        : '기초 정보'  ,
	collapsible  : true       ,
	collapsed    : true       ,
	defaultFocus : 'code_cd'  ,

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
				items :
				[
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
				xtype : 'form-panel',
				dock : 'left',
				width : 330,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				items :
				[
					{
						xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items :
						[
							{
								fieldLabel     : '기초코드' ,
								name           : 'code_cd'   ,
								xtype          : 'textfield'   ,
								allowBlank     : false,
								fieldCls       : 'requiredindex',
								emptyText      : Const.invalid.emptyValue,
								width          : 255
							},{
								xtype           : 'lookupfield',
								name        	: 'row_sts'  ,
								lookupValue     : resource.lookup('row_sts'),
								width          	: 55           ,
								margin          : '0 0 0 5'
							}

						]
					},{ fieldLabel		: '언어구분',
						xtype           : 'lookupfield',
						name        	: 'lang_gbcd'  ,
						lookupValue     : resource.lookup('lang_gbcd'),
					},{
						xtype : 'textfield',
						name : 'code_nm',
						fieldLabel : '코드이름',
						allowBlank: false,
						emptyText: Const.invalid.emptyValue
					},{
						fieldLabel : '메모사항' ,
						name : 'usr_memo' ,
						xtype : 'textarea'  ,
						height : 135
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
				xtype : 'tabpanel',
				region : 'center',
				margin : 0 ,
				plain: true ,
				items: [ me.createTab1() ]
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
				title: '코드항목' ,
				xtype : 'form-panel' ,
				layout : 'hbox',
				border : 0 ,
				bodyStyle: { padding: '5px' },
				items :
				[
					{
						fieldLabel : '' ,
						name       : 'itm_val' ,
						xtype      : 'textarea',
						emptyText  : 'key : value  형식으로 작성 하시기 바랍니다.',
						height     : 167 ,
						flex       : 1
					},{
						fieldLabel : '' ,
						name       : 'lookup_val' ,
						xtype      : 'textarea',
						readOnly   : true,
						//width      :100
						hidden     : true
					}
				]
			}
		;
		return item;
	}
});


