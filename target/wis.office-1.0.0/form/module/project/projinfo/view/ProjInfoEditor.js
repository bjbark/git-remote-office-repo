Ext.define('module.project.projinfo.view.ProjInfoEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-projinfo-editor',



	height : 254,
	layout : {
		type: 'border'
	},

	title        : '사이트 정보'  ,
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
		 	 		 			fieldLabel     : '식별코드' ,
		 	 		 			name           : 'pjt_id'         ,
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			//readOnly       : true ,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 			width          : 190
		 	 		 		},{
		 	 		 			fieldLabel     : '순서' ,
				 	 			name           : 'row_ord'  ,
				 	 			xtype          : 'numericfield',
				 	 			width          : 60 ,
				 	 			labelWidth     : 25 ,
				 	 			margin		   : '0 0 0 5'
		 	 		 		},{
				 	 			name        	: 'row_sts'  ,
				 	 			xtype           : 'lookupfield',
				 	 			lookupValue     : resource.getList('row_sts'),
				 	 			width          	: 55 ,
				 	 			margin		: '0 0 0 5'
		 	 		 		}
		 	 		 	]
		 	 		},{
		 	 			xtype : 'textfield',
		 	 			name : 'pjt_nm',
		 	 			fieldLabel : '프로젝트명'  ,
		 	 			allowBlank: false
		 	 		},{
		 	 			xtype : 'textfield',
		 	 			name : 'pjt_url',
		 	 			fieldLabel : '호스트명'  ,
		 	 			vtype      : 'domain' ,
		 	 			emptyText  : '연결될 URL 주소를 입력 합니다.'

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
		var me = this, item =
		{
			title: '메모사항' ,
			xtype : 'form-panel' ,
			layout : 'hbox',
			border : 0 ,
			bodyStyle: { padding: '5px' },
			items :
			[
			 	{
			 		fieldLabel : '' ,
			 		name       : 'usr_memo' ,
			 		xtype      : 'textarea',
			 		height     : 167 ,
			 		flex       : 1
			 	}
			]
	 	};
		return item;
	}

});


