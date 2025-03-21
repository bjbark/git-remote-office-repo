Ext.define('module.prod.mold.moldshot.view.MoldShotEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-moldshot-editor',

	height : 315,
	layout : {
		type: 'border'
	},

	title			: Language.get('mold_idcd',''),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'mold_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 380, labelWidth : 80, labelSeparator : '',readOnly	: true},
				width			: 380,
				items			: [
					{	fieldLabel	: Language.get('line_seqn','항번'),
						name		: 'line_seqn',
						xtype		: 'textfield',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 200,
					},{	fieldLabel	: Language.get('date','일자'),
						xtype		: 'datefield',
						name		: 'invc_date',
						itemID		: 'invc_date',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						width		: 200,
						readOnly	: false,

					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('invc_numb','작업번호'),
								xtype		: 'textfield',
								name		: 'invc_numb',
								width		: 220,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('invc_seqn','-'),
								xtype		: 'numericfield',
								name		: 'invc_seqn',
								width		: 80,
								labelWidth : 10,
								fieldCls : 'readonlyfield',
							}
						]
					},{	fieldLabel	: Language.get('prod_item','생산품목'),
						name		: 'item_name',
						xtype		: 'textfield',
						width		: 300,
						fieldCls : 'readonlyfield',
					},{	fieldLabel	: Language.get('cvic_name','생산설비'),
						name		: 'cvic_name',
						xtype		: 'textfield',
						width		: 300,
						fieldCls : 'readonlyfield',
					},{	fieldLabel	: Language.get('init_shot','초기SHOT'),
						name		: 'init_shot',
						xtype		: 'numericfield',
						width		: 200,
						fieldCls : 'readonlyfield',
					},{	fieldLabel	: Language.get('work_shot','작업SHOT'),
						name		: 'work_shot',
						xtype		: 'numericfield',
						width		: 200,
						fieldCls : 'readonlyfield',
					},{	fieldLabel	: Language.get('updt_shot','수정SHOT'),
						name		: 'updt_shot',
						xtype		: 'numericfield',
						width		: 200,
						readOnly	: false,
						listeners	: {
							change : function(field,newval) {

								var form = this.up('form').getForm();
									totl_shot = form.findField('temp_totl_shot'),
									init_shot = form.findField('init_shot').lastValue,
									work_shot =form.findField('work_shot').lastValue;
								totl_shot.setValue(newval+init_shot+work_shot);

							}
						}
					},{	fieldLabel	: Language.get('temp_totl_shot','누계SHOT'),
						name		: 'temp_totl_shot',
						xtype		: 'numericfield',
						width		: 200,
						fieldCls	: 'readonlyfield',
					}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				border:0,
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1()]
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
		item = {
				title		:  Language.get('user_memo','메모'),
				layout		: 'hbox'		,
				border		: 0				,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '내용을 적어주십시오',
						height		: 220,
						flex		: 1
					}
				]
		}
		;
		return item;
	}
});