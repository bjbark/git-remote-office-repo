/**
 * 그리드의 column별로 context menu를 생성해줄수 있는 플러그인<br/>
 * 
 * ## 예제
 *     // 1. column별 메뉴설정
 *     // 그리드의 column 설정시 customMenu라는 속성명으로 menu를 등록하면 된다.
 *     {   text : '등록', dataIndex: 'inpt_use_yn'	, width: 50  , xtype : 'checkcolumn' , renderer : me.checkboxRenderer , processEvent : me.checkboxProcessEvent,
 *         customMenu: [{
 *             xtype : 'menucheckitem', // check menu
 *             id   : 'customMenuinsert_yn', // id는 반드시 지정해야 한다.
 *             text : '등록 전체선택',
 *             listeners : {
 *                 click : function ( item, e, eOpts ) {
 *                     var checked = item.checked;
 *                     var store = me.getStore();
 *                     var nodeInterface = store.getRootNode();
 *                     // record의 data에 active_yn을 true로 해주고 밑에서 grid view를 refresh를 해야 속도 저하 문제가 없다.
 *                     // record.set('active_yn', true);를 하면 속도저하 문제가 많다.
 *                     nodeInterface.cascadeBy(function(record){
 *                         if(record.get('leaf')) {
 *                             record.data.inpt_use_yn = checked;
 *                             record.dirty = true;
 *                         }
 *                     });
 *                     me.getView().refresh();
 *                 }
 *             } // end listeners
 *         }] // end custom menu
 *     }
 *     
 *     // 2. 전체컬럼에 공통으로 메뉴설정
 *     initHeaderMenu : function (ct, menu, eOpts) {
 *         var grid = this;
 *         menu.add({
 *             xtype : 'menucheckitem',
 *             text : '전체선택', // check menu
 *             listeners : {
 *                 checkchange : function (thisObj, checked, eOpts) {
 *                     if(checked){
 *                         grid.getSelectionModel().selectAll();
 *                     } else {
 *                         grid.getSelectionModel().deselectAll();
 *                     }
 *                 }
 *			    }
 *         });
 *     }
 * 
 * 출처 - http://stackoverflow.com/questions/10348581/add-a-custom-button-in-column-header-dropdown-menus-extjs-4
 */
Ext.define('Axt.grid.plugin.GridColumnMenu', {
	alias: 'plugin.gridcolumnmenu',
    extend: 'Ext.AbstractPlugin',
    init: function (component) {
        var me = this;
        
        me.menuItemMap = Ext.create('Ext.util.HashMap');
        me.customMenuItemsCache = [];
        
        me.grid = component;
        
        component.headerCt.on('menucreate', function (cmp, menu) {
            menu.on('beforeshow', me.showHeaderMenu, me);
            if(component.initHeaderMenu) {
            	component.initHeaderMenu(cmp, menu);
            	
            }
            
            // grid가 load되었을때 menu들도 초기화 해주기 위해 이벤트 걸어둠
            if(component.store) { // component is grid.
            	component.store.on('load', function(store, node, records, successful, eOpts){
            		me.refreshMenuItems(menu);
            		me.menuItemMap.clear();
            	});
            }
            
        }, me);
    },

    /**
     * @method initHeaderMenu
	 * grid header의 메뉴 추가<br/>
	 * Axt.grid.Panel을 확장(상속)하는 grid클래스에서 아래의 메서드를 override한다.<br/>
	 * this.callParent를 가장 하단으로 이동시키면 자식메뉴를 생성후<br/>
	 * 부모클래스의 initHeaderMenu를 호출한다.
	 * 
	 * ## 예제 
	 *     initHeaderMenu : function (ct, menu, eOpts) {
     *         this.callParent([ct, menu, eOpts]);
     *         var grid = this;
     *         menu.add([
     *             {
     *                 text : '메뉴1(메뉴안의 메뉴)',
     *                 iconCls : 'icon-pdf', // icon지정
     *                 menu : [ {
     *                     text : '메뉴1-1',
     *                     handler : function () {
     *                         Ext.Msg.alert('선택', 'You selected ' + this.text);
     *                     }
     *                 }, {
     *                     text : '메뉴1-2',
     *                     handler : function () {
     *                         Ext.Msg.alert('선택', 'You selected ' + this.text);
     *                     }
     *                 } ]
     *             },
     *             {
     *                 text : '메뉴2',
     *                 handler : function() {
     *                     var columnDataIndex = menu.activeHeader.dataIndex;
     *                     console.log(columnDataIndex);
     *                 }
     *             },
     *             {
     *                 xtype : 'menucheckitem',
     *                 text : 'grid select all', // check menu
     *                 listeners : {
     *                     checkchange : function (thisObj, checked, eOpts) {
     *                         console.log('checked', checked);
     *                         if(checked){
     *                             grid.getSelectionModel().selectAll();
     *                         } else {
     *                             grid.getSelectionModel().deselectAll();
     *                         }
     *                     }
     *                 }
     *             },
     *             {
     *                 text : '날짜 선택',
     *                 menu : {                  // date menu
     *                     xtype:'datemenu',
     *                        listeners : {
     *                        select : function (dp, sdate, edate) {
     *                            console.log(sdate)
     *                            console.log(edate)
     *                            Ext.Msg.alert('날짜 선택', 'You selected date is ' + Ext.Date.format(sdate, 'M j, Y'));
     *                        }
     *                     }
     *                 }
     *             },
     *             {
     *                 text : '색상 선택',
     *                 menu : {                  // date menu
     *                     xtype:'colormenu',
     *                     handler : function(thisObj, color, eOpts) {
     *                         Ext.Msg.alert('색상 선택', 'You selected color is ' + color);
     *                     }
     *                 }
     *             },
     *             {   xtype: 'menuseparator'   }
     *         ]); // end menu add
     *     }
	 * 
	 * @param {Ext.grid.header.Container} ct Ext.grid.header.Container의 instance
	 * @param {Ext.menu.Menu} menu 생성된 그리드헤더의 메뉴
	 * @param {Object} eOpts The options object passed to Ext.util.Observable.addListener
	 * 
	 */

    showHeaderMenu: function (menu) {
        var me = this;
        me.removeCustomMenuItems(menu);
        me.addCustomMenuitems(menu);
    },

    removeCustomMenuItems: function (menu) {
        var me = this,
            menuItem;

        while (menuItem = me.customMenuItemsCache.pop()) {
            menu.remove(menuItem.getItemId(), false);
        }
    },

    addCustomMenuitems: function (menu) {
        var me = this,
            renderedItems;

        var menuItems = menu.activeHeader.customMenu || [];
        
        if (menuItems.length > 0) {
            if (menu.activeHeader.renderedCustomMenuItems === undefined) {
                renderedItems = menu.add(menuItems);
                menu.activeHeader.renderedCustomMenuItems = renderedItems;
            } else {
                renderedItems = menu.activeHeader.renderedCustomMenuItems;
                menu.add(renderedItems);
            }
            Ext.each(renderedItems, function (renderedMenuItem) {
            	me.menuItemMap.add(renderedMenuItem.id, renderedMenuItem);
                me.customMenuItemsCache.push(renderedMenuItem);
            });
        }
    },
    
    /**
     * @private
     * grid의 store가 load될때 menu item들을 초기화
     * 
     * @param {Ext.menu.Menu} menu 생성된 그리드헤더의 메뉴
     */
    refreshMenuItems : function(menu) {
    	var me = this;
    	var menus = me.menuItemMap.getValues();
    	// 각 컬럼별 customMenu 초기화
	    Ext.each(menus, function (renderedMenuItem) {
	    	if(renderedMenuItem instanceof Ext.menu.CheckItem) {
	    		renderedMenuItem.setChecked(false);
	    	}
	    });
//	    // 모든 컬럼의 공통 menu 초기화
	    Ext.each(menu.items.items, function (renderedMenuItem) {
        	// store가 load되어 데이터가 초기화될때 checkItem도 초기화 해준다.
        	if(renderedMenuItem instanceof Ext.menu.CheckItem) {
        		renderedMenuItem.setChecked(false);
        	}
        });
    }
});