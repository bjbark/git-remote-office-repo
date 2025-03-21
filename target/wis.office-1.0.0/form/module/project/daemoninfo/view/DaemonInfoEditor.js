Ext.define('module.project.daemoninfo.view.DaemonInfoEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-daemoninfo-editor',
	height : 247,
	layout : {
		type: 'border'
	},
	title : '프로세스 정보',
	collapsible : true,
	collapsed : true ,
	defaultFocus : 'bonsa_nm',
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest() ];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this, item =
		{
	   	 	xtype : 'toolbar',
	   	 	dock: 'bottom',
	   	 	items:
	   	 	[
	   	 	 	'->',// '-',
	   	 	 	{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },'-' ,
	   	 	 	{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }
	   	 	]
	   	};
		return item;
	},

//	createText : function () {
//		var me = this, item =
//		{
//			xtype      : 'textfield',
//			dock       : 'bottom',
//	 		name       : 'listener_text',
//	 		fieldLabel : 'TNS',
//	 		flex       : 1 ,
//	 		labelWidth : 65 ,
//	 		margin : '5 5 0 0'
//	 	};
//		return item;
//	},

//{name: 'listener_text', 		type: 'string'  },



	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this, item =
		{
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
	 	 		 			fieldLabel  : '서버정보',
				 	 		xtype      : 'popupfield',
							editable	: true,
							enableKeyEvents : true,
				 	 		name       : 'host_cd',
				 	 		pair       : 'host_id',
				 	 		//emptyText  : Const.infoNull.queryAll,
				 	 		clearable  : false,
				 	 		readOnly   : false,
				 	 		fieldCls   : 'requiredindex',
				 	 		width      : 255 ,
				 	 		popup      : {
		 	 		 			widget : 'lookup-hostinfo-popup',
		 	 		 			select : 'SINGLE',
		 	 		 			params : { row_state : 0 },
		 	 		 			result : function(records, nameField, pairField) {
		 	 		 				nameField.setValue(records[0].get('host_cd'));
		 	 		 				pairField.setValue(records[0].get('host_id'));
		 	 		 			}
		 	 		 		}
		 	 		 	},{	 name : 'host_id', xtype : 'textfield' , hidden : true
		 	 		 	},{
		 	 		 		xtype           : 'lookupfield',
		 	 		 		name        	: 'row_state'  ,
		 	 		 		lookupValue     : resource.getList('row_state'),
		 	 		 		width          	: 55           ,
		 	 		 		margin          : '0 0 0 5'
		 	 		 	}
		 	 		]
		 	 	},{	fieldLabel : '프로세스명' , name : 'daemon_nm', xtype : 'textfield'
 	      	    }
		 	]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this, item =
		{
			xtype : 'tabpanel',
			region : 'center',
			margin : 0 ,
			plain: true,
			items: [ me.createTab1() ]
		};
		return item;
	},



	/**
	 * 메모사항
	 */
	createTab1 : function() {
		var me = this,
		item = {   title	 : '메모사항',
				   xtype 	 : 'form-panel' ,
			       layout 	 : 'hbox',
			       border 	 : 0 ,
			       bodyStyle : { padding: '5px' },
			       items	 : [
				       {
				    	   //fieldLabel : '' ,
				    	   name       : 'user_memo' ,
				    	   xtype      : 'textarea',
				    	   height     : 160 ,
				    	   flex       : 1
				       }
//				       {
//							xtype      : 'textfield',
////							dock       : 'bottom',
//					 		name       : 'listener_text',
//					 		//fieldLabel : 'TNS'
//					 		//flex       : 1
//					 	//	labelWidth : 65 ,
//					 	//	margin : '5 5 0 0'
//					 	}
				  ]
		}
		;
		return item;
	} ,


});


