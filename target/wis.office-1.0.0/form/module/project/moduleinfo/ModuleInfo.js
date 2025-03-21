Ext.define( 'module.project.moduleinfo.ModuleInfo', { extend:'Axt.app.Controller',

	models:[
	 	'module.project.moduleinfo.model.ModuleInfo'
	],
	stores: [
	  	'module.project.moduleinfo.store.ModuleInfo'
	],
	views : [
	 	'module.project.moduleinfo.view.ModuleInfoLayout',
	 	'module.project.moduleinfo.view.ModuleInfoLister',
	 	'module.project.moduleinfo.view.ModuleInfoSearch',
	 	'module.project.moduleinfo.view.ModuleInfoEditor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-moduleinfo-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			'module-moduleinfo-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-moduleinfo-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			'module-moduleinfo-lister button[action=insertAction]' : { click : me.insertAction }, // 신규
			'module-moduleinfo-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-moduleinfo-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제
			'module-moduleinfo-lister' : { selectionchange: me.selectRecord  }, //, itemclick : me.selectRecord
			'module-moduleinfo-lister dataview' : {nodedragover : me.nodeDragOver, beforedrop : me.beforeDrop, drop : me.finishDrop }
		});
		me.callParent(arguments);
	},

	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-moduleinfo-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-moduleinfo-search')[0] } ,
		editor  : function () { return Ext.ComponentQuery.query('module-moduleinfo-editor')[0] } ,
		lister  : function () { return Ext.ComponentQuery.query('module-moduleinfo-lister')[0] }
	},

	/**
	 * 그리드에서 드래그 이벤트 발생시, 마우스 커서가 타겟 지점을 이동시에 드랍 가능 불가 여부를 리턴한다.
	 */
	nodeDragOver : function (dropModel, dropPosition, dragModel, dragevent2, dragevent3) {
		var sourceobj = dragModel.records[0], targetobj = dropModel;
		if ((dropPosition === 'append') || (targetobj.get('depth') === 1) ){ return false;
		} else {
			if (dropPosition==='before'){ if (targetobj.previousSibling === sourceobj){return false;} /* 현재 지점으로 부터 처번째 상노드는 현재 지점이므로 의미없다 */
			} else if (dropPosition==='after' ){ if (targetobj.nextSibling === sourceobj){return false;} /* 현재 지점으로 부터 처번째 하노드는 현재 지점이므로 의미없다 */
			}
		}
	},
	/**
	 * 드래그 드랍 이벤트가 최종 확정된후 이벤트
	 */
	finishDrop :function(node, dragModel, dropModel, dropPosition, dropHandlers ) {
		/* 변경된 데이터 사항을 커밋해 버린다. 이곳에서 서버 처리 하고 싶지만, 서버 장애시 화면에 대한 취소 방법이 없어 beforedrop 에서 구현함 */
		Ext.each(this.pocket.lister().getStore().getUpdatedRecords(), function(record) { record.reject(); });
	},
	/**
	 * 드래그 드랍 이벤트가 최종 결정되기 전 이벤트
	 */
	beforeDrop : function(dragevent, dragModel, dropModel, dropPosition, dropHandlers ) {
		var me = this, lister = me.pocket.lister();
		dropHandlers.wait = true;
		Ext.MessageBox.confirm('change', '데이터의 위치를 변경 하시겟습니까?', function(btn){
			if (btn === 'yes') {
				var linkedobj, sourceobj = dragModel.records[0], targetobj = dropModel, store = lister.getStore(); // console.debug( 'position p/s/t= ' + dropPosition , sourceobj, targetobj );
				/* 소스와 타겟의 부모 객체가 다른경우라면, 소스의 부모 객체의 정보를 변경한다. */
				if (sourceobj.parentNode !== targetobj.parentNode) {
					/* 자신의 원 부보를 찾아서 하위 자식이 없으면 폴더 마크들 제거해 버린다. */
					if (sourceobj.parentNode.childNodes.length <= 1) {
						sourceobj.parentNode.data.leaf      = true;
						sourceobj.parentNode.data.last_modl_yn = true;
						sourceobj.parentNode.setDirty();
					};
				}
				/* 변경된 위치의 정보로 정보를 갱신한다. */
				sourceobj.data.row_lvl = targetobj.parentNode.data.depth + 1 ;
				sourceobj.data.prnt_id = targetobj.data.prnt_id ;
				sourceobj.setDirty();
				/* 데이터 정렬 순서를 맞춘다. */
				var indexingNo = 0;
				Ext.each(targetobj.parentNode.childNodes , function( record ) {
					if (record===targetobj){
						if (dropPosition === 'before') {
							sourceobj.data.row_ord = ++indexingNo;
							sourceobj.setDirty();
							targetobj.data.row_ord = ++indexingNo;
							targetobj.setDirty();
						} else if (dropPosition === 'after') {
							if (targetobj.data.row_ord !== ++indexingNo){
								targetobj.data.row_ord = indexingNo;
								targetobj.setDirty();
							}
							sourceobj.data.row_ord = ++indexingNo;
							sourceobj.setDirty();
						}
					} else
					if (record !== sourceobj){
						if (record.get('row_ord') !== ++indexingNo){
							record.set('row_ord', indexingNo);
							record.setDirty();
					}
					}
				});
				/* 변경된 정보를 서버에 보낸다. */
				store.sync({
					success : function(batch, operation ){ dropHandlers.processDrop(); },
					failure : function(operation){ store.rejectChanges(); dropHandlers.cancelDrop();}
				});
			} else {
				dropHandlers.cancelDrop();
			}
		});
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.getStore().load({
			params:{param:JSON.stringify(param)}
			, scope:me,
			callback:function(records, operation, success) {
				if (success) {
					lister.getRootNode().expand();
					lister.getSelectionModel().select(0);
				} else { editor.getForm().reset(true); }
				mask.hide();
			}
		});
	},

	/**
	 * 레코드 선택
	 */
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},
	/**
	 * 수정
	 */
	modifyAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.modifyRecord({
			callback : function( results ) {
				if (results.success) {
					results.feedback( {success : true, visible : true } );
				}
			}
		}, me);
	},
	/**
	 * 신규
	 */
	insertAction:function( ) {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			parent = lister.getSelectionModel().getSelection()[0]
		;
		if (parent){
			editor.insertBefore({
				keygen : {
                    url    : _global. location.http () + '/listener/seq/maxid.do',
                    object : resource. keygen,
                    params : {
                         token : _global. token_id ,
                         param : JSON. stringify({
                             stor_id	: _global.stor_id,
                             table_nm	: 'module_mst'
                          })
                     }
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							record   : Ext.create( lister.getStore().model.modelName ,{
								id : keygen.records[0].seq,
								leaf : true,
								pjt_id   : parent.get('pjt_id'  ),
								last_modl_yn : true,
								prnt_id : parent.get('id'       ),
								//host_id : parent.get('host_id'),
								row_lvl : parent.get('depth'    ) + 1,
								row_ord : me.getSortOrder(parent.childNodes)
							}),
							parent   : parent,
							lister   : lister,
							disables :[me.pocket.layout().down('#mainpanel')],
							autosync : true ,
							callback: function (results){
								if (results.success) {
									results.feedback({success : true , visible : true });
								}
							}
						});
					}
				}
			}, me);
		} else { Ext.Msg.alert( Const.ERROR , '상위 메뉴를 선택하여 주시기 바랍니다.' ); }
	},

	/**
	 * 트리 순서를 유지하기, 추가될 하위 레코드의 순서를 계산하여 최종 값을 넘겨준다.
	 */
	getSortOrder:function( nodes ) {
		var sortno = 1 ;
		if (nodes.length > 0) {
			Ext.each(nodes, function( record ) {

				if (sortno <= record.get('row_ord')) { sortno = record.get('row_ord') + 1;}

			});
		}
		return sortno ;
	},


	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.updateRecord({
			lister : me.pocket.lister(),
			caller   : me,
			callback : function(results, record, store, parent ) {
				if (results.success){
					if (results.inserted) { parent.set('last_modl_yn' , false);} /* 현재 선택된 레코드는 폴더로 용도를 변경한다. */
					store.sync({
						success : function(operation){ results.feedback({success : true , visible : false });
							if (results.inserted) { parent.expand(); }
						}, // 저장 성공시
						failure : function(operation){ results.feedback({success : false });}, // 저장 실패시 호출
						callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
					});
				}
			}
		}, me);

	},
	/**
	* 취소
	*/
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller   : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true, selectRecord : true });
				}
			}
		}, me);
	},
	/**
	 * 삭제
	 */
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			caller   : me,
			lister : me.pocket.lister(),
			before : function (results, record, store ) {
				if (record.get('depth') <= 1) {
					Ext.Msg.alert( Const.ERROR , "최상위 노드는 삭제 하실수 없습니다.");
					return ;
				}
				if (record.childNodes.length > 0) {
					Ext.Msg.alert( Const.ERROR , "하위 노드가 존재 합니다. 하위 노드를 먼저 삭제해 주시기 바랍니다.");
					return ;
				}
				results.feedback( {success : true });
			},
			callback : function(results, record, store) {
				var parent = record.parentNode ;
				if (parent.childNodes.length  <= 1){
					parent.set('leaf'      , true);
					parent.set('last_modl_yn' , true);
				}
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	}
});





