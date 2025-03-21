Ext.define('module.project.moduleinfo.view.ModuleInfoSearch', {  extend: 'Axt.form.Search',
	alias: 'widget.module-moduleinfo-search',

	/**
	 */
	initComponent: function(){
		var me = this;
		me.items = [me.searchBasic(),me.createLine1()];
		me.callParent();
	},

	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
		 		,region	: 'center'
	    	    ,width	: '100%'
	    	    ,height  : 40
	    	    ,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset'
						,border	: 3
						,flex	: 1
						,style	: { borderColor	: '#263c63', borderStyle	: 'solid' }
						,region	: 'center'
					    ,height	: 34
					    ,margin	: '3 3 3 0'
					    ,layout	: 'hbox'
					    ,items	: [
			 	 			{   xtype	: 'label',
			 	 			    text	: 'SEARCH  | ',
			 	 			    margin	: '7 10 0 0',
			 	 			    cls		: 'my-label-style',
			 	 			},{	name	: 'find_nm'     ,
					 			xtype	: 'searchfield',
				 	 			margin	: '3 10 0 0',
								flex	: 1,
						 		enableKeyEvents : true,
								listeners:{
						 			keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
										}
			 			 			},
			 					}
					 		}
					    ]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
//					},{	xtype	: 'button' , text : Const.SELECT_DETAIL.text,action : Const.SELECT.action , cls: 'button-style',height  : 34,margin : '3 0 0 0',region : 'north'
					}
				]
			}
		;
		return line;
	},
	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this,
			line = {
			xtype : 'fieldset',
			collapsible : true,
			collapsed	: true,
			items : [
			 	{	fieldLabel    : '프로젝트' ,
			 		name          : 'pjt_id'   ,
			 		xtype         : 'lookupfield',
			 		editable      : false ,
			 		autoSelection : true  ,
			 		value		  : '14821',
			 		lookupValue   : _global.objects.project
			 	},{ xtype		: 'lookupfield',
			 		name		: 'row_sts' ,
			 		fieldLabel	: '사용여부' ,
			 		value		: ''   ,
			 		lookupValue : resource.getList('search_all').concat( resource.getList('row_sts' ))
			 	}
			]
		};
		return line;
	}
});
