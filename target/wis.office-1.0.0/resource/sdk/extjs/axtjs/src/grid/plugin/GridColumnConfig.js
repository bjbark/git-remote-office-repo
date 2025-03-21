/**
 * grid의 columns 상태를(순서, 숨김) 저장/복원하는 플러그인<br/>
 * 현재는 header 2단까지 지원된다.
 *
 * ## 예제
 *     //그리드의 plugins속성을 설정한다.
 *     plugins : [
 *         {
 *             ptype:'gridcolumnconfig'
 *         }
 *     ]
 */
Ext.define('Axt.grid.plugin.GridColumnConfig', {
	alias: 'plugin.gridcolumnconfig',
	pluginId: 'gridcolumnconfig',
    extend: 'Ext.AbstractPlugin',
    requires:[
        'Axt.grid.store.GridColumnConfig',
	    'Axt.grid.model.GridColumnConfig'
    ],
    init: function (grid) {
    	var me = this;
    	var gridName = grid.xtype;
    	var gridHeaderStore = grid.gridHeaderStore;

    	// gridHeader store 없으면 생성
		if( ! grid.gridHeaderStore) {
			grid.gridHeaderStore = Ext.create('Axt.grid.store.GridColumnConfig');
		}
		grid.gridHeaderStore.load();

		me.grid = grid;

		// localstorage에 저장된 정보로 컬럼의 순서 복원
		me.setOrder(grid, gridName);

		// localstorage에 저장된 hide될 column정보를 읽어서 column의 hide속성을 true로 전환
		me.setHideColumns(grid, gridName);

    },

    /**
     * @private
     * 그리드 컬럼순서 복원
     */
    setOrder : function (grid, gridName) {
    	var me = this;
    	var columns = grid.columns.items?grid.columns.items:grid.columns;
    	var gridHeaderStore = grid.gridHeaderStore;

    	var temp = [];
    	if(grid.gridHeaderStore) {
    		var gridHeaderModel = gridHeaderStore.findRecord('grid_name', gridName);
    		if(gridHeaderModel) {
    			var order_columns = Ext.decode(gridHeaderModel.get('order_columns'));
    			if(order_columns.length > 0) {
    				grid.reconfigure(null ,order_columns);
    			}
    		}
    	}

    },

    /**
     * @private
     * localstorage에 저장된 hide될 column정보를 읽어서 column의 hide속성을 true로 전환
     */
    setHideColumns : function (grid, gridName) {
    	var gridHeaderStore = grid.gridHeaderStore;
//    	var columns = grid.columns.items?grid.columns.items:grid.columns;
    	var columns = grid.headerCt.items.items; //headerContainer.items.items;

    	if(grid.gridHeaderStore) {
			var gridHeaderModel = gridHeaderStore.findRecord('grid_name', gridName);
			if(gridHeaderModel) {
				var hideColumns = Ext.decode(gridHeaderModel.get('hide_columns'));
				var order_columns = [];

				for(var i=0; i<columns.length; i++) {
					if(columns[i].columns !== undefined) { // 자식이 있는 컬럼 (2단)

						var subColumns = columns[i].items.items;

						var keyHideCount = 0;
						for(var k=0; k<subColumns.length; k++) {

							var subColumn = subColumns[k];

							for(var j=0; j<hideColumns.length; j++) {
								if(hideColumns[j].dataIndex === subColumn.dataIndex) {
									subColumn.hidden=true;
									keyHideCount++;
								}// end if
							} // end hideColumns loop

							if(subColumns.length === keyHideCount) {
								subColumn.up().hidden=true;
							}
						}

					} else { // 자식이 없는 컬럼 (1단)
						for(var j=0; j<hideColumns.length; j++) {
							if(hideColumns[j].dataIndex === columns[i].dataIndex) {
								columns[i].hidden=true;
							}// end if
						} // end hideColumns loop
					}

				} // end columns loop
			}

		}
    },

    /**
     * 설정 저장
     */
    save : function(){
    	var me = this;
    	var grid     = me.grid;
    	var gridHeaderStore = grid.gridHeaderStore;
    	gridHeaderStore.load();

    	var headerContainer = grid.headerCt;
    	var gridName = grid.xtype;

    	Ext.Msg.confirm('확인', '저장 하시겠습니까?.', function(value){
    		if(value === 'yes') {

    			var hiddenColumns = [];

    			// column중 hide상태인것들을 hiddenColumns배열에 넣는다.
    			Ext.each(headerContainer.items.items, function(item){ // 1단
    				var subHiddenColumns = [];
    				if(item.items.items.length > 0) {
    					Ext.each(item.items.items, function(subItem){// 2단
    						if(subItem.isHidden()) {
    							hiddenColumns.push({
    								dataIndex : subItem.dataIndex
    							});
    						}
    					});
    				}
    				if(item.isHidden()) {
    					hiddenColumns.push({
    						dataIndex : item.dataIndex
    					});
    				}
    			});


    			// 그리드의 컬럼순서 저장을 위한 준비
    			// 자식이 있는 컬럼과 자식이 없는 컬럼을 구분하여 orderColumns배열에 넣는다.
    			var orderColumns = [];
    			var currentColumns = headerContainer.items.items;
    			for(var i=0; i<currentColumns.length; i++) {
    				if(currentColumns[i].isCheckerHd === undefined && currentColumns[i].columns === undefined){ // 자식이 없는 컬럼
    					orderColumns.push(currentColumns[i].initialConfig);
    				} else if(currentColumns[i].isCheckerHd === undefined && currentColumns[i].columns === null){ // 자식을 갖고있는 컬럼
    					var temp = [];
    					Ext.each(currentColumns[i].items.items, function(subItem){
    						temp.push(subItem.initialConfig);
    					});

						// 부모컬럼정보에 자식컬럼에 대한 최신화를 시켜서 orderColumns에 넣는다.
						var columnWithChild = currentColumns[i].initialConfig;
						columnWithChild.columns = temp;
    					orderColumns.push(columnWithChild);

    				}
    			}

    			// 위에서 분류했던 hide정보와, 순서 정보를 localstorage에 저장
    			console.log('column config save : ', gridName);
    			var gridHeaderModel = gridHeaderStore.findRecord('grid_name', gridName);
    			if(gridHeaderModel) {
    				gridHeaderModel.set('hide_columns', Ext.encode(hiddenColumns)); // 숨겨진 컬럼
    				gridHeaderModel.set('order_columns', Ext.encode(orderColumns)); // 컬럼 순서
    			} else {
    				gridHeaderStore.add({
    					grid_name : gridName,
    					hide_columns : Ext.encode(hiddenColumns),
    					order_columns : Ext.encode(orderColumns)
    				});
    			}
    			gridHeaderStore.sync();

    		}
    	});

    },

    /**
     * localstorage에 저장된 컬럼 숨김/순서 정보를 모두 제거하고 초기화 한다.
     */
    clear : function(){
    	var me = this;
    	var grid     = me.grid;
    	var gridName = grid.xtype;
    	var gridHeaderStore = grid.gridHeaderStore;
    	gridHeaderStore.load();

    	var gridHeaderModel = gridHeaderStore.findRecord('grid_name', gridName);

    	if(gridHeaderModel) {
	    	Ext.Msg.confirm('확인', '"예"를 클릭하면 레이아웃 설정정보가 초기화된후 브라우저가 Reload 됩니다.', function(value){
	    		if(value === 'yes') {
		    		gridHeaderStore.remove(gridHeaderModel);
		    		gridHeaderStore.sync({
		    			callback : function(){
	    						window.location.reload();
		    			}
		    		});
	    		}
	    	});
    	} else {
    		Ext.Msg.alert('확인', '저장된 컬럼 설정정보가 없습니다.');
    	}
    }

});