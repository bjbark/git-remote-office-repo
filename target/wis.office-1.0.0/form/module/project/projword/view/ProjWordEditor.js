Ext.define('module.project.projword.view.ProjWordEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-projword-editor',
	height : 254,
	layout : {
		type: 'border'
	},

	title        : '단어 정보'  ,
	collapsible  : true       ,
	collapsed    : true       ,
	defaultFocus : 'code_nm'  ,

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
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'}, '-'
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
				xtype		: 'form-panel',
				dock		: 'left',
				width		: 330,
				bodyStyle	: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	fieldLabel	: '단어코드' ,
								name		: 'word_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 185
							},{	xtype		: 'lookupfield',
								name		: 'word_dvcd'  ,
								lookupValue	: resource.getList('word_dvcd'),
								width		: 70,
								margin		: '0 0 0 5'
							},{ xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.getList('line_stat'),
								width		: 50,
								margin		: '0 0 0 5'
							}
						]
					},{ xtype		: 'textfield',
						name		: 'word_name',
						fieldLabel	: '단어명',
						allowBlank	: false,
						emptyText	: Const.invalid.emptyValue
					},{	xtype		: 'lookupfield',
						fieldLabel	: '고객별 단어',
						name		: 'locl_yorn'  ,
						lookupValue	: resource.getList('yorn'),
					},{ fieldLabel	: '메모사항' ,
						name		: 'user_memo' ,
						xtype		: 'textarea'  ,
						height		: 80
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
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0 ,
				plain	: true ,
				items	: [ me.createTab1() ]
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
				title	: '주요 언어 단어명' ,
				xtype	: 'form-panel' ,
				layout	: 'vbox',
				border	: 0 ,
				bodyStyle: { padding: '5px' },
				items	: [
					{	xtype		: 'textfield',
						name		: 'word_eglh_name',
						fieldLabel	: '영문',
						allowBlank	: true,
						width		: 400
					},{	xtype		: 'textfield',
						name		: 'word_chna_name',
						fieldLabel	: '중국어',
						allowBlank	: true,
						width		: 400
					},{	xtype		: 'textfield',
						name		: 'word_jpan_name',
						fieldLabel	: '일어',
						allowBlank	: true,
						width		: 400
	 				},{	xtype		: 'textfield',
						name		: 'word_etcc_name',
						fieldLabel	: '기타',
						allowBlank	: true,
						width		: 400
					}
				]
			}
		;
		return item;
	}
});


