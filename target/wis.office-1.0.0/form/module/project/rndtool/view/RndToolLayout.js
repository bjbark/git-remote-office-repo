Ext.define('module.project.rndtool.view.RndToolLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-rndtool-layout',

initComponent: function(config) {
	var me = this,
	    buttons = {
            items: [
                {   xtype	: 'tbfill' },
                {   xtype	: 'button',
                    text	: Const.SELECT.text ,
                    iconCls	: Const.SELECT.icon ,
                    action	: Const.SELECT.action,
                    cls		: 'button-style'
                }
            ]
        };
		me.dockedItems.push({xtype: 'module-rndtool-search'}), // 검색조건
		me.items = [
            {	xtype   : 'tab-panel',
				itemId  : 'mainpanel',
				region  : 'center',
				flex    : 1,
				tabBar  : buttons,
				items: [
			        {	title: '그리드 정의',
						layout : 'border',
						border : 0,
						items  : [
							{   region : 'west',
                                layout : 'border',
                                border : 0,
                                width	: 400,
                                items  : [
                                    /*  좌측 상단  */
                                    {   xtype  : 'module-rndtool-lister-module',
                                        split  : true,
                                        flex	: 2,
                                        region : 'north',
                                        style  : Const.borderLine.left + Const.borderLine.bottom
                                    },
                                    /*  좌측 하단  */
                                    {   xtype  : 'module-rndtool-lister-view',
	   		 		    	    	    flex   : 1,
                                        region : 'center',
                                        style  : Const.borderLine.left + Const.borderLine.top
                                    }
                                ]
							},{ region : 'center',
					            xtype   : 'tab-panel',
	                            layout : 'border',
	                            border : 0,
	                            items  : [
									{	title: 'Grid Data',
										layout : 'border',
										border : 0,
										region : 'center',
										items  : [
											{   region : 'center',
												layout : 'border',
												border : 0,
												items  : [
													{   xtype  : 'module-rndtool-lister',
														flex   : 1,
														region : 'center',
														style  : Const.borderLine.left + Const.borderLine.top
													}
												]
											}
										]
									},{	title: 'Script',
										layout : 'border',
										border : 0,
										region : 'center',
										items  : [
											{   region : 'center',
												layout : 'border',
												border : 0,
												items  : [
													{   xtype  : 'module-rndtool-lister-script',
														flex   : 1,
														region : 'center',
														style  : Const.borderLine.left + Const.borderLine.top
													}
												]
											}
										]
									}
								]
							}
						]
			        }
		        ]
            },
            {	title	: 'DB Fiels Info',
            	xtype	: 'module-rndtool-editor',
            	region	: 'south',
            	hidden	: false
            }

          ]
		me.callParent(arguments);
	}
});