/**
 */
Ext.define( 'Axt.app.Controller', { extend: 'Ext.app.Controller',

//	manager : {
//		action : 'normal',
//		button : {
//			insertButton : undefined,
//			//selectButton : undefined,
//		    updateButton : undefined,
//		    cancelButton : undefined,
//		    deleteButton : undefined,
//		    reportButton : undefined,
//		    exportButton : undefined
//		    //closerButton : undefined
//		},
//		Memory : 0 ,
//		Normal : 0 ,
//		Modify : 0 ,
//		setToolNormal : function(){
//			if (this.Memory != this.Normal) { this.setToolButton(this.Normal); }
//		},
//		setToolModify : function(){
//			if (this.Memory != this.Modify) { this.setToolButton(this.Modify); }
//		},
//		setToolButton : function( action ) {
//			this.Memory = action;
//			this.button.insertButton.setDisabled( !(( action & Const.FORM_AUTH_INSERT) == Const.FORM_AUTH_INSERT ));
//			this.button.selectButton.setDisabled( !(( action & Const.FORM_AUTH_SELECT) == Const.FORM_AUTH_SELECT ));
//			this.button.updateButton.setDisabled( !(( action & Const.FORM_AUTH_UPDATE) == Const.FORM_AUTH_UPDATE ));
//			this.button.cancelButton.setDisabled( !(( action & Const.FORM_AUTH_CANCEL) == Const.FORM_AUTH_CANCEL ));
//			this.button.deleteButton.setDisabled( !(( action & Const.FORM_AUTH_DELETE) == Const.FORM_AUTH_DELETE ));
//			this.button.reportButton.setDisabled( !(( action & Const.FORM_AUTH_REPORT) == Const.FORM_AUTH_REPORT ));
//			this.button.exportButton.setDisabled( !(( action & Const.FORM_AUTH_EXPORT) == Const.FORM_AUTH_EXPORT ));
//			//this.button.closerButton.setDisabled( !(( action & Cons.FORM_AUTH_CLOSER) == Cons.FORM_AUTH_CLOSER ));
//		}
//	},

	init: function() {
		var me = this;
	},

	/**
	 * 키이벤트 설정
	 * ## 예제
	 *
	 *     // (API) http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.EventObject-property-A
	 *     //       http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.util.KeyMap
	 *
	 *     // controller에 initKeyMap이라는 이름으로 function을 만든다.
	 *     initKeyMap : function(){
     *         var me = this;
     *         // 키 바인딩 (각 컨트롤러의 쓰임세에 맞게 수정가능)
	 *         binding = [
     *             {   // F2
     *                 key: Ext.EventObject.F2,
     *                 defaultEventAction:'preventDefault', // 브라우저의 원래 이벤트를 막는다. (주석처리해놓으면 원래의 브라우저 이벤트를 허용)
     *                 fn: function(){ // 그리드 조회
     *                     me.selectAction();
     *                 }
     *             },{ // F3
     *                 key: Ext.EventObject.F3,
     *                 defaultEventAction:'preventDefault',
     *                 fn: function(){ // editor닫기
     *                     var editor = me.pocket.editor();
     *                     if(editor.getCollapsed()) {
     *                         editor.expand();
     *                     } else {
     *                         editor.collapse();
     *                     }
     *                 }
     *             },{ // ctrl + shift + alt + F6 (multiple actions)
     *                 key: Ext.EventObject.F6,
     *                 ctrl:true,
     *                 shift:true,
     *                 alt:true,
     *                 defaultEventAction:'preventDefault',
     *                 fn: function(){ // 엑셀 다운로드
     *                     me.exportAction();                 // <== 이부분에 원하는 action을 넣는다.
     *                 }
     *             }
     *         ]; // end binding
	 *
	 *         me.callParent([binding]); // 변경불가 (공통)
	 *     }
	 *
	 */
	initKeyMap : function (binding, target) {
	    if(binding){
	        var keyMap =  Ext.create('Ext.util.KeyMap', {
   			    target:  target || Ext.getBody(), // 키 이벤트가 붙는 범위
		        binding: binding
		    });

		    this.keyMap = keyMap;
	    }
	},

	/**
	 * 이벤트 활성화/비활성화
	 */
	setKeyMap : function (isOn) {
		this.keyMap.enabled = isOn;
	},

	/**
	 * 키이벤트 리턴
	 */
	getKeyMap : function () {
		return this.keyMap;
	},

	/**
	 * 초기 권한 설정
	 */
	userPermission: 0 ,
	joinPermission: function(joinClass, permission){
		var me = this;
		if (joinClass){
			joinClass.setDisabled(!((me.userPermission & permission) == permission));
		}
	},
	initPermission: function(workspace, permission){
		var me = this,
			button = undefined
		;
		if (!me._initpermission){
			if (permission.Permit) {
				me.userPermission = permission.Permit;
				console.debug('퍼미션 소스코드 변경 요함 = ' , permission.Permit );
			} else {
//				me.userPermission = permission;
				// 현재 권한 관련 기능이 없으므로 우선 전체 권한을 모두 부여한다.
				// Constant.js에는 아래와 같이 각각의 권한 고유 값을 부여하고 있다.
//			    PERMIT : {
//					INSERT :   2, // 등록
//					MODIFY :   4, // 수정
//					DELETE :   8, // 삭제
//					REPORT :  16, // 출력
//					EXPORT :  32, // 엑셀
//				},

				me.userPermission = 62;
			}
			me.joinPermission( workspace.down('[action=insertAction]') , Const.PERMIT.INSERT );
			me.joinPermission( workspace.down('[action=modifyAction]') , Const.PERMIT.MODIFY );
			me.joinPermission( workspace.down('[action=updateAction]') , Const.PERMIT.MODIFY );
			me.joinPermission( workspace.down('[action=deleteAction]') , Const.PERMIT.DELETE );
			me.joinPermission( workspace.down('[action=reportAction]') , Const.PERMIT.REPORT );
			me.joinPermission( workspace.down('[action=exportAction]') , Const.PERMIT.EXPORT );

			me._initpermission = true ;
		}
	},

	/**
	 * 신규
	 */
//	insertBefore : function() {
//		return true;
//	},
//
//	/**
//	 * 신규
//	 */
//	insertAction : function() {
//		this.manager.setToolModify();
//		return true;
//	},
//
//	/**
//	 * 조회 액션이 발생전
//	 */
//	selectBefore : function() {
////		// 모든 그리드 초기화
////		console.debug( this.workspace );
////		Ext.each(this.workspace.query('grid'), function(grid) {
////
////			console.debug( 'xxxxxxxxxxxxxxxxxxxxx' , grid );
////			grid.getSelectionModel().deselectAll(true);
////			grid.store.currentPage = 1; // 그리드 페이지1 설정
////		}, this);
//		return true ;
//	},
//
//	/**
//	 * 조회 액션이 발생후
//	 */
//	selectAction : function() {
//		this.manager.setToolNormal();
//		return true;
//	},
//	/**
//	 * 저장
//	 */
//	updateAction : function() {
//		this.manager.setToolNormal();
//		return true;
//	},
//
//	/**
//	 * 취소
//	 */
//	cancelAction : function() {
//		this.manager.setToolNormal();
//		return true;
//	},
//
//	/**
//	 * 삭제
//	 */
//	deleteAction : function() {
//		this.manager.setToolNormal();
//	    return true;
//	},
//
//	/**
//	 * 출력
//	 */
//	reportAction : function() {
//	},
//
//	/**
//	 * 엑셀
//	 */
//	exportAction : function() {
//	},
//
//	/**
//	 * 닫기
//	 */
//	closerAction : function() {
//	},
//	getMaskPanel : function(message) {
//		var mask = new Ext.LoadMask( this.workspace, { msg: message || ACTIVE_ACTION_MESSAGE } );
//		mask.show();
//		return mask;
//	},


//	me.maskpanel = new Ext.LoadMask(me.workspace, { msg: "처리중 입니다. 잠시만 기다려 주십시오." });
//	msg: "<span class='text-warn'>처리중</span>입니다... 잠시만 기다려 주십시오.",
//	cls: 'main-mask',
	//,maskCls: ''
//});


//	me.workspace, { msg: "처리중 입니다. 잠시만 기다려 주십시오." }
//	this.maskpanel.show();
//	return this.maskpanel;

//	var myMask = new Ext.LoadMask(this.workpanel.getEl(), {msg: message });
//	myMask.show();
//	return myMask ;
















	defaultActionMessage: function() {
		if (!Ext.isIE) {
			console.error(Glos.MSG_NO_ACTION);
		}
		// Ext.Msg.alert(Glos.NOTICE, Glos.MSG_NO_ACTION);
		alert(Glos.NOTICE +':'+ Glos.MSG_NO_ACTION);
	},

	/**
	 * 신규 기본 설정 - 현재 탭의 모든 폼, 그리드 초기화 - 콤보박스 최상위 선택
	 *
	 * @private
	 */
	defaultAddAction: function() {
		if (this.disabledDefaultAddAction) { return; }

		// form 초기화
		Ext.each(this.currentTabPanel.query('form'), function(form) {
			form.getForm().reset();
		});

		// combo 선택 초기화. 최상단의 option으로 설정
		Ext.each(this.currentTabPanel.query('combo'), function(combo) {

			// if (combo.readOnly || combo.isDisabled()) { return; }

			var record = this.store.getAt(0);
			if (record) {
				this.setValue(record.get(this.valueField));
			}
		});

//		// grid 선택 초기화
//		Ext.each(this.currentTabPanel.query('grid'), function(grid) {
//			grid.getSelectionModel().deselectAll(true);
//		});
	},

	/**
	 * 조회 기본 설정 - 조회버튼으로 신규 조회할 경우 Master와 Detail은 Clear
	 *
	 * @private
	 */
	defaultSearchAction: function() {
//		if (this.disabledDefaultSearchAction) { return; }

		// 검색폼을 제외한 모든 폼 초기화
		Ext.each(this.workspace.query('form'), function(form) {
			if (form.getXType() !== 'form-search') {
				form.getForm().reset();
			}
		}, this);

		// 모든 그리드 초기화
		Ext.each(this.workspace.query('grid'), function(grid) {
			grid.getSelectionModel().deselectAll(true);
			grid.store.currentPage = 1; // 그리드 페이지1 설정
		}, this);
	},

	/**
	 * 디테일 그리드 툴바 설정. 서브 클래스에서 재정의 한 function이 설정 된다.
	 */
	initDetailGridToolbar: function() {

		var me = this;

		var grid = me.detailGrid;

		// 버튼
		var addRowButton = grid.getAddRowButton();
		var deleteRowButton = grid.getDeleteRowButton();

		// event 설정. 해당 controller class에 설정 된 function이 있을 경우에 적용한다.
		if (addRowButton) {
			addRowButton.on('click', me.addRowAction || me.defaultAddRowAction, me);
		}

		if (deleteRowButton) {
			// 행삭제 버튼 활성화
			// TODO 재차 비활성화도 필요한가?
			grid.on('selectionchange', function() {
				var selection = grid.getView().getSelectionModel().getSelection()[0];
				if (selection) {
					deleteRowButton.enable();
				}
			});
			deleteRowButton.on('click', me.deleteRowAction || me.defaultDeleteRowAction, me);
		}
	},

	/**
	 * 디테일 그리드 행추가
	 */
	defaultAddRowAction: function() {
		if (this.disabledDefaultAddRowAction) { return; }

		var grid = this.detailGrid;
		var store = grid.getStore();

		var record, modelType = grid.modelType;
		// 해당 store의 모델 생성
		if (modelType) {
			record = Ext.create(modelType);
		} else {
			var model = {
				extend: 'Ext.data.Model',
				fields: store.model.getFields()
			};
			record = Ext.define('phantomRecord', model);
		}

		// grid에 삽입 후 에디터 포지션 설정
		store.insert(0, record);
		grid.editing.startEditByPosition({
			row: 0,
			column: 1
		});
	},

	/**
	 * 디테일 그리드 행삭제
	 */
	defaultDeleteRowAction: function() {
		var grid = this.detailGrid;
		var selection = grid.getView().getSelectionModel().getSelection()[0];
		if (selection) {
			grid.getStore().remove(selection);
		}
	},

	/**
	 * 메인툴바 enable/disable 설정
	 *
	 * @param {String} action 버튼의 action명
	 * @param {Boolean} isDisabled 비활성화 여부
	 */
//	setToolbarButtonDisabled: function(action, isDisabled) {
//		var toolbar = this.currentTabPanel.down('contentToolbar');
//		var button = toolbar.down('button[action=' + action + ']');
//		if (!button) { return; }
//		button.setDisabled(isDisabled);
//	},

	/**
	 * 상세목록 툴바 enable/disable 설정
	 *
	 * @param {String} action 버튼의 action명
	 * @param {Boolean} isDisabled 비활성화 여부
	 */
	setDetailToolbarButtonDisabled: function(action, isDisabled) {
		var grid = this.detailGrid;
		var button = grid.down('button[action=' + action + ']');
		if (!button) { return; }
		button.setDisabled(isDisabled);
	},

	/**
	* 스토어를 가져올때는 패키지명을 반드시 주어야 함.
	*
	*/
//	getStore: function(name) {
//
//
//    	var me=this, storeId = (name.indexOf("@") == -1) ? name : name.split("@")[0],
//            store = Ext.StoreManager.get(storeId);
//
//        if (!store) {
//            store = Ext.create(me.packageName+'.store.'+storeId, {
//                storeId: storeId,
//                packageName:me.packageName
//            });
//        }
//
//        return store;
//    },
//    getModel:function(model){
//    	var _model = this.application.getModel(model);
//    	console.log('model =====>'+_model);
//    	return _model;
//    },

	/**
	 * 키이벤트 설정
	 */
	setKeyEvent: function(currentTabPanel) {
		var i = 0, searchFields = currentTabPanel.query('searchfield'), searchField;
		for (; i < searchFields.length; i++) {
			searchField = searchFields[i];
			if (i === 0) {
				searchField.focus(true, true);
			}

			searchField.on('specialkey', function(obj, e) {
				if (e.getKey() == e.ENTER) {
					var searchButton = currentTabPanel.query('button[action=search]')[0];
					searchButton.fireEvent('click'); // action 설정 실행
				}
			}, this);
		}

		var k = 0, popupFields = currentTabPanel.query('popupfield'), popupField;
		for (; k < popupFields.length; k++) {
			popupField = popupFields[k];
			popupField.on('specialkey', function(obj, e) {
				if (e.getKey() == e.ENTER) {
					obj.onTriggerClick();
				}
			}, this);
		}
	},

	/**
	 * loadmask 시작, 중지
	 *
	 * @param {Boolean} start
	 *
	 */
	setMask: function(start) {
		if (start === false) {
			this.tabPanelMask.hide();
		} else {
			this.tabPanelMask.show();
		}
	},

	/**
	 * 현재 활성화 된 탭패널의 하단 상태바를 반환
	 *
	 * @return {Ext.ux.statusbar.StatusBar} 상태바
	 */
//	getStatusBar: function() {
//		return this.statusbar;
//	},

	/**
	 * controller의 모든 store에 리스너 등록
	 */
	addListenersToStore: function() {
		var stores = this.stores;
		var sb = this.getStatusBar();
		for (idx in stores) {
			var store = this.getStore(stores[idx]);
			store.on('beforesync', function(options, eOpts) {
				this.setMask();
				sb.showBusy();
			}, this);
			// success
			store.on('write', function(store, operation, eOpts) {
				this.setMask(false);
				var action = operation.action;
				var status = this.getSuccessStatus(action);
				sb.setStatus(status);
			}, this);
			// failure
			store.getProxy().on('exception', function(proxy, response) {
				this.setMask(false);
				var action = response.request.options.action;
				var status = this.getFailureStatus(action);
				sb.setStatus(status);
			}, this);
			store.on('beforeload', function(store, operation, eOpts) {
				sb.showBusy();
			}, this);
			store.on('load', function(store, operation, eOpts) {
				sb.clearStatus();
			}, this);
		}
	},
	treeExchange:function(treeStore,gridStore){ // tree Data -> grid Data 변환, 트리 js 는 오버라이드 불가하여 엑셀을 만들 수 없어 일반 그리드에 담아 엑셀표시
		var me = this;
		for (var i = 0; i < treeStore.getRootNode().childNodes.length; i++) {
			me.recursiveTree(treeStore.getRootNode().getChildAt(i),gridStore);
		}
	},
	recursiveTree : function(node,store){
		var me = this;
		store.add(node.data);
		if(node.childNodes.length > 0){
			for (var i = 0; i < node.childNodes.length; i++) {
				me.recursiveTree(node.getChildAt(i),store);
			}
		}else{
			return;
		}
	}
});
