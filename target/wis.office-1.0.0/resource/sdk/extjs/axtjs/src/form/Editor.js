Ext.define('Axt.form.Editor', { extend:'Axt.form.Panel',
	alias		: 'form-editor',
	layout		:'border',
	border		: 0 ,
	fieldDefaults: {labelAlign : 'right',  width : 215, labelWidth : 60, labelSeparator : '' },
	defaults	: {
		xtype	: 'fieldset',
		layout	: 'vbox',
		margin	: '0 0 4 0',
		padding	: '0',
		border	: 0
	},
	defaultFocus: 'initfocused',

	insertFocus	: 'insertfocus',
	mofifyFocus	: 'modifyfocus',

	line_seqn	: 1,
	getSEQ : function() {
		return this.line_seqn++;
	},
	setSEQ : function(seq) {
		if (Number(seq) >= Number( this.line_seqn ) ){
			this.line_seqn = Number(seq) + 1 ;
		}
	},
	disp_numb : 1,
	getDSP : function() {
		return this.disp_numb++;
	},
	setDSP : function(dsp) {
		if (Number( dsp ) >= Number( this.disp_numb ) ){
			this.disp_numb = Number( dsp ) + 1 ;
		}
	},

	/**
	 *
	 */
	selectRecord: function( config ) {
		this.attachRecord(config);
	},

	/**
	 *
	 */
	attachRecord: function( config ) {
		var me = this,
			record = Utils.firstRecord( config.record )
		;
		if (record) {
			if (config.title){
				me.setTitle(config.title);
			}
			if (me.isInserted){
				delete me.isInserted;
			}
			me.lister = config.lister ;
			me.loadRecord(record);
			if (me.onAttachRecord) {
				me.onAttachRecord(record);
			}
			if (config.callback) {
				config.callback({
					success : true,
					feedback : function(results) {}
				}, record );
			}

		}
	},

	/**
	  *
	*/
	insertBefore : function(config) {
		var me = this,
			showmask = (typeof config.keygen.masked === 'undefined') ? true : config.keygen.masked
		;
		if (config.callback && config.keygen ){
			if( Ext.isFunction(config.keygen.object)){
				if (showmask) {
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.INSERT.mask });
					mask.show();
				}
				config.keygen.object({
					url		: config.keygen.url,
					params	: config.keygen.params,
					parent	: config.keygen.parent,
					callback:function( keygen ){
						if (showmask){ mask.hide(); }
						if (keygen.success){
							config.callback( keygen ); //  { success : true, id : results.id , cd : results.cd }
						} else {
							Ext.Msg.alert( Const.ERROR , keygen.message );
						}
				 	}
				});
			} else {
				config.callback({ success : true, id : config.keygen , cd : '' });
			}
		}
	},

	/**
	 *
	*/
	insertRecord : function(config) { //,   record, lister, select
		var me = this;
		if (config.callback){
			if (config.action === Const.EDITOR.DEFAULT){
				var record = config.record;
				if (record) {
					//me.lister = config.lister ;
					me.parent = config.parent ;
					me.disables = config.disables;
					if (me.disables) {
						Ext.each(me.disables, function(object) {
							object.setDisabled(true);
						});
					}
					me.loadRecord(record);
					config.callback({
						success : true,
						feedback : function(results) {
							var	focusobject = me.getForm().findField(me.insertFocus);
							if	(focusobject){
								focusobject.focus(false, 200);
							}
 							if	(config.finished) { /* 완료 펑선을 호출한다. */
								config.finished({ success : true }, record );
							}

// 							var focusobject = me.down( '#' + me.defaultFocus );
// 							if (!focusobject) {
// 								focusobject = me.getForm().findField(me.defaultFocus);
// 							}
// 							if (focusobject){
// 								focusobject.focus(false, 200);
// 							}
							//me.expand(false);
						}
					}, record , parent );
				}
			} else
			if (config.action === Const.EDITOR.INVOICE ) {
				//console.debug('gggggggggggggggggggg invoice  ') ;
				me.disp_numb	= 1;
				me.line_seqn	= 1;

				if (config.refers) {
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.INSERT.mask });
					mask.show();

					me.getStore().load({
						params: config.refers,scope: me,
						callback: function(records, operation, success) {
							mask.hide();
							if (success) {

								if (records[0]) {
									records[0].phantom = true ; /* 신규 상태 마크 */
									records[0].product().data.each( function( item ) {
										me.setSEQ( item.get('line_seqn' ));
										me.setDSP( item.get('disp_seqn' ));
										item.phantom = true ;  /* 신규 상태 마크 */
									});
									config.callback({
										success	: true,
										feedback: function(results) {
											if (results.success){
												me.loadRecord( records[0] );
												config.lister.bindStore( records[0].product() );
												config.lister.editor = me ;
												me.isInserted = true ;

												var	focusobject = me.ownerCt.down( '#' + me.defaultFocus );
												if	(focusobject){
													focusobject.focus(false, 200);
												}
												if	(config.finished) { /* 완료 펑선을 호출한다. */
													config.finished({ success : true }, record );
												}
											}
										}
									},records[0]);
								} else {
									config.callback({
										success : false,
									});
								}

							}
						}
					});

				} else {
					if (config.record) {

						var store = me.getStore();
						store.clearData();
						store.loadData([],false);

						config.callback({
							success : true,
							feedback : function(results) {
								if (results.success){
									me.loadRecord(config.record);
									config.lister.bindStore( config.record.product() );
									config.lister.editor = me ;
									me.isInserted = true ;
									var focusobject = me.ownerCt.down( '#' + me.defaultFocus );
									if (focusobject){
										focusobject.focus(false, 200);
									}
								}
							}
						},config.record );
					}
				}
			} else {

				//console.debug('gggggggggggggggggggg') ;
				if (config.record) {
					me.lister	= config.lister ;
					me.parent	= config.parent ;
					me.disables	= config.disables;
					if (me.disables) {
						Ext.each(me.disables, function(object) {
							object.setDisabled(true);
						});
					}

					//console.debug( 'config.record' , config.record   );
					me.loadRecord(config.record);
					me.isInserted = true ;
					config.callback({
						success : true,
						feedback : function(results) {

							var focusobject = me.down( '#' + me.defaultFocus );
							if (!focusobject) {
								focusobject = me.getForm().findField(me.defaultFocus);
							}
							if (focusobject){
								focusobject.focus(false, 200);
							}
							me.expand(false);
						}
					}, config.record );
				}
			}
		}
	},

	/**
	 *
	 */
	modifyRecord : function(config){
		var me = this;
		if (config.action === Const.EDITOR.DEFAULT ) {
			var record = me.getRecord();
			if (record && config.callback){ /* 선택된 레코드가 존재 하며, 콜백이 있는경우만 정상 처리 한다. */
				/* 콜백 펑션을 보낸경우면 콜백을 호출 한다. */
				config.callback({
					success : true,
					feedback : function(results) {
						if (results.success) {
							/* 포커스가 있다면 디폴트 포커서를 연결 한다.없음 말고 */
//   							var focusobject = me.down( '#' + me.modifyFocus );
//   							if (!focusobject) {
//   								focusobject = me.getForm().findField(me.defaultFocus);
//   							}
							var focusobject = me.getForm().findField(me.modifyFocus);
							if (focusobject){
								focusobject.focus(false, 200);
							}
							//if (results.visible) {me.expand(false);}

							if (config.finished) { /* 완료 펑선을 호출한다. */
								config.finished({ success : true }, record );
							}
						}
					}
				}, record );
			}


		} else
		if (config.action === 'payment' ) {
			delete me.isInserted;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			me.getStore().load({
				params: config.params,scope: me,
				callback: function(records, operation, success) {
					mask.hide();
					if (success) {
						if (records.length > 0) {

							me.loadRecord( records[0] );

							config.lister.editor = me ;
							config.callback({
								success  : true,
								records  : records ,
								feedback : function(results) {
									if (results.success) {
										var focusobject = me.ownerCt.down( '#' + me.defaultFocus );
										if (focusobject){
											focusobject.focus(false, 200);
										}
									}
								}
							}, records[0] );
						} else {
							config.callback({
								success  : false
							});
						}
					}
				}
			});
		} else
		if (config.action === 'invoice' ) {
			delete me.isInserted;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			me.getStore().load({
				params	: config.params,scope: me,
				callback: function(records, operation, success) {
					mask.hide();
					if (success) {
						if (records.length > 0) {
							me.line_seqn	= 1;
							me.disp_numb	= 1;

							//console.debug( 'me.loadRecord( records[0] );' , records[0] );
							me.loadRecord( records[0] );
							config.lister.bindStore( records[0].product() );
							config.lister.editor = me ;

							records[0].product().data.each( function( item ) {
								me.setSEQ( item.get('line_seqn' ));
								me.setDSP( item.get('disp_seqn' ));
							});

							// treegrid플러그인을 사용중이면 초기화
							if(config.lister && config.lister.getPlugin('treegridplugin')) {
								config.lister.getPlugin('treegridplugin').initialize();
							}

							config.callback({
								success  : true,
								records  : records ,
								feedback : function(results) {
									if (results.success) {
										var focusobject = me.ownerCt.down( '#' + me.defaultFocus );
										if (focusobject){
											focusobject.focus(false, 200);
										}
									}
								}
							}, records[0] );
						} else {
							config.callback({
								success  : false
							});
						}
					}
				}
			});

		} else {
			/* 선택된 레코드가 존재 해야 정상이다. */
			if (me.getRecord()){
				/* 콜백 펑션을 보낸경우면 콜백을 호출 한다. */
				if (config.callback) {
					config.callback({
						success : true,
						feedback : function(results) {
							if (results.success) {
								/* 포커스가 있다면 디폴트 포커서를 연결 한다.없음 말고 */

								var focusobject = me.down( '#' + me.defaultFocus );
								if (!focusobject) {
									focusobject = me.getForm().findField(me.defaultFocus);
								}
								if (focusobject){
									focusobject.focus(false, 200);
								}
								if (results.visible) {
									me.expand(false);
								}
							}
						}
					}
					)};
			} else { } //Ext.Msg.alert(Const.ERROR, Const.invalid.inputValue );
		}
	},


	/**
	 *
	 */
	updateRecord : function(config) {
		var me = this,
			record = me.getRecord(),
			values = me.getValues()
		;

		if (me.getForm().isValid() && record && values ){
			if (config.action === Const.EDITOR.INVOICE ){
				if	(!config.option)	{
					config.option = config.option || { detail : {} } ;
				};
				if(record.raw.mold_idcd||record.raw.pjod_idcd){
				}else{
					if	(!(config.option.detail.empty == 'allow' )) {
						if (record.product().getCount() === 0){
							Ext.Msg.alert('알림', config.option.detail.emptyMsg ? config.option.detail.emptyMsg : '품목을 추가 하여 주시기 바랍니다.' );
							return;
						};
					}
				}
				if(config.lister && config.lister.getPlugin('treegridplugin')) {
					config.lister.getPlugin('treegridplugin').clearFilter(true);
				}
			}
			record.set(values);
			if (config.before) {
				config.before({
					success  : true,
					feedback : function (results) {
						if (results.success) {
							me.updateAction(config, record )
						}
					}
				}, record );
			} else {
				me.updateAction(config, record )
			}


		} else {
			Ext.Msg.alert(Const.ERROR, Const.invalid.inputValue );
		}
	},

	/**
	 *
	 */
	updateAction: function(config, record) {
		var me = this,
			autosync = (typeof config.autosync === 'undefined') ? true : config.autosync
		;
		if (config.callback){
			if (config.action	=== Const.EDITOR.DEFAULT ) {
				var store		= config.store;
				var operation	= record.phantom ? Const.EDITOR.PROCESS.INSERT : Const.EDITOR.PROCESS.UPDATE;
				if (record.phantom) {
					store.insert( 0 , record );
				}

				var syncrow = store.getNewRecords().length + store.getUpdatedRecords().length + store.getRemovedRecords().length ;
				if (syncrow>0){
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					config.callback({
						success	: true ,
						feedback: function ( results ) {
							if (results.success){
								if (me.disables) {
									Ext.each(me.disables, function(object) {
										object.setDisabled(false);
									});
								}
								delete me.disables;
								if (config.finished) { /* 완료 펑선을 호출한다. */
									config.finished({ success : true }, record , operation);
								}
							} else {
								store.rejectChanges();
							}
						},
						callback : function (results ) {
							mask.hide();
						}
					}, record, me.parent )
				} else {
					Ext.Msg.alert(Const.ERROR, "변경된 내용이 없습니다." );
				}
			} else
			if (config.action === 'payment' ) {
				var store = me.getStore();
				//if (autosync){
					if (me.isInserted) {
						if (store.indexOf(record) < 0 ){ /* 레코드가 미등록된 경우라면 */
							store.insert( 0 , record ) ;
						}
					}
				//}
				var syncrow = store.getNewRecords().length + store.getUpdatedRecords().length + store.getRemovedRecords().length ;
				if (!autosync || (syncrow>0)){
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					config.callback({
						success : true ,
						syncrow : syncrow,
						inserted : me.isInserted,
						/* 다시 콜백을 받아온다 */
						feedback : function ( results ) {
							if (results.success){
								delete me.isInserted;
							}
						},
						callback : function (results ) {
							mask.hide();
						}
					}, record, store, me.parent )
				} else {
					Ext.Msg.alert(Const.ERROR, '변경된 내용이 없습니다.' );
				}
			} else
			/* 작업 */
			if (config.action === Const.EDITOR.INVOICE ) {

				var store = me.getStore();

				if (autosync){
					if (me.isInserted) {
						if (store.indexOf(record) < 0 ){ /* 레코드가 미등록된 경우라면 */
							store.insert( 0 , record ) ;
						}
					}
				}
				var syncrow = store.getNewRecords().length + store.getUpdatedRecords().length + store.getRemovedRecords().length ;
				if (!autosync || (syncrow>0)){
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();

					config.callback({
						success : true ,
						syncrow : syncrow,
						inserted : me.isInserted,
						/* 다시 콜백을 받아온다 */
						feedback : function ( results ) {
							if (results.success){
//										if (me.isInserted){
//											me.lister.getSelectionModel().select(record );//    formControl.selectRecord( config.lister, record );
//										}
								delete me.isInserted;
									//if  (!results.visible) { me.collapse(false); }
							} else {
								store.rejectChanges();
							}
						},
						callback : function (results ) {
							mask.hide();
						}
					}, record, store, me.parent )
				} else {
					if(config.lister && config.lister.getPlugin('treegridplugin')) {
						config.lister.getPlugin('treegridplugin').initialize();
					}

					Ext.Msg.alert(Const.ERROR, '변경된 내용이 없습니다.' );
				}
			} else { /* 일반 */
					//if (config.callback) {
					//record.set(values); // 데이터를 변경 한다.
				var store = me.lister.getStore();
				//console.debug( '412 store', store );
				if (autosync){

					if (me.isInserted) {
						if (store instanceof Ext.data.TreeStore ) {
							me.parent.set('leaf'      , false); /* 현재 선택된 레코드는 폴더로 용도를 변경한다. */
							me.parent.appendChild(record );
						} else {
							store.insert( 0 , record ) ;
							//store.add(record);
						}
					}
				}
				var syncrow = store.getNewRecords().length + store.getUpdatedRecords().length + store.getRemovedRecords().length ;
				if (!autosync || (syncrow>0)){
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					config.callback({
						success : true ,
						syncrow : syncrow,
						inserted : me.isInserted,
						/* 다시 콜백을 받아온다 */
						feedback : function ( results ) {

							if (results.success){
								if (me.disables) {
									Ext.each(me.disables, function(object) {
										object.setDisabled(false);
									});
								}
								delete me.disables;
								if (me.isInserted){
									me.lister.getSelectionModel().select(record );//    formControl.selectRecord( config.lister, record );
								}
								delete me.isInserted;
								if  (!results.visible) { me.collapse(false); }
							} else {
								if (me.isInserted && (store instanceof Ext.data.TreeStore )) {
									me.parent.removeChild(record);
									store.removed = [];
								}
								store.rejectChanges();
							}
						},
						callback : function (results ) {
							mask.hide();
						}
					}, record, store, me.parent )
				} else {
					Ext.Msg.alert(Const.ERROR, "변경된 내용이 없습니다." );
				}
			}
		}
	},

	/**
	 *
	 */
	cancelRecord : function(config) {
		var me     = this,
			record = me.getRecord()
		;
		var inserted ;

		if (config.action === Const.EDITOR.DEFAULT ) {
			if (record && config.callback ){
				/* 콜백을 호출한다 */
				config.callback({
					success : true,
					feedback : function(results) { /* 피드백을 받는다 */
						if (results.success) {
							me.getForm().reset(record.phantom);
							if (!record.phantom) { /* 수정인경우 */
								me.loadRecord(record);
							} else if (results.reload && config.caller.attachRecord) {
								config.caller.attachRecord();
								//if (config.caller.attachRecord)();
								//if (inserted && me.lister && config.caller) {
									//results.reload( me.lister.view, me.lister.getSelectionModel().getSelection());
								//}
							}

							if (me.disables) {
								Ext.each(me.disables, function(object) {
									object.setDisabled(false);
								});
								delete me.disables;
							}
							//if (results.hidden) {
							//	me.collapse(false);
							//}
							if (config.finished) { /* 완료 펑선을 호출한다. */
								config.finished({ success : true }, record );
							}
						}
					}
				}, record );
				//}
			}
// 							if (!record.phantom) {
// 								me.loadRecord(record);
// 							}
// 								if (inserted && me.lister && config.caller) {
// 									results.attachRecord( me.lister.view, me.lister.getSelectionModel().getSelection());
// 								}




// 			if (me.disables) {
// 	            Ext.each(me.disables, function(object) {
// 	            	object.setDisabled(false);
// 	            });
// 	            delete me.disables;
// 			}

		} else if (config.action === 'invoice' ) {
	 		if (config.callback) {
				config.callback({
					success : true,
					inserted : inserted,
					feedback : function(results) {
						if (results.success) {
						}
					}
				});
			}
		} else {
			//phantom
			console.debug ('삭제될 소스를 사용중임 ') ;
			if (me.isInserted){
				me.getForm().reset(true)
				delete me.isInserted;
				inserted = true ;
				//if (config.callback) { config.callback({success : true, action : 'insert' })};

			} else {
				var record = me.getRecord();
				if (record){
					me.getForm().reset(false);
					me.loadRecord(record);
				}
				inserted = false ;
			}
			if (me.disables) {
				Ext.each(me.disables, function(object) {
					object.setDisabled(false);
				});
			}
			delete me.disables;

	 		if (config.callback) {
				config.callback({
					success : true,
					inserted : inserted,
					feedback : function(results) {
						if (results.success) {
							if (results.attachRecord) {
								if (inserted && me.lister && config.caller) {
									results.attachRecord( me.lister.view, me.lister.getSelectionModel().getSelection());
								}
							} else {
								if (results.selectRecord && inserted && me.lister && config.caller) {
									if (config.caller.selectRecord) { // 이곳은 향후 삭제 예정
										config.caller.selectRecord( me.lister, me.lister.getSelectionModel().getSelection());
									} else {
										config.caller.attachRecord( me.lister, me.lister.getSelectionModel().getSelection());
									}
								}
							}
							if (results.visible) {
								me.collapse(false);
							}
						}
					}
				});
			}
		}
	},

	/**
	 *
	 */
	deleteRecord : function(config) {
		var me = this, records = config.lister.getSelectionModel().getSelection();
		if (records && records.length > 0){
			var record = records[0], store = config.lister.getStore();
			if (config.before) {
				config.before({
					success : true,
					feedback : function (results) {
						if (results.success) {
							me.deleteAction(config, record, store )
						}
					}
				}, record );
			} else {
				me.deleteAction(config, record, store )
			}
		} else { Ext.Msg.alert( Const.ERROR , Const.NOVALUE_DELETE );} // 선택된 데이터가 없을때
	},

	/**
	 *
	 */
	deleteAction : function(config, record, store) {
		var me = this, autosync = (typeof config.autosync === 'undefined') ? true : config.autosync ;

		Ext.Msg.show({ title: '삭제확인', msg: '데이터를 삭제하시겟습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (config.callback && (button==='yes')) {

					if (config.action === Const.EDITOR.DEFAULT ) {
						var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
						mask.show();
						if (autosync) {
							store.removed.push(record);
						}
						config.callback({
							success : true,
							feedback : function ( results ) {

								if (results.success){ // 저장이 성공된 경우
									if (autosync) {
										if (store instanceof Ext.data.TreeStore ) {
											record.remove();
										} else {
											store.remove (record);
										}
										store.removed = [];
									}
									if (config.finished) { /* 완료 펑선을 호출한다. */
										config.finished({ success : true } );
									}

									//me.getForm().reset(true);
									//me.collapse(false);
								} else { // 저장을 실패한경우
									if (autosync) {
										store.removed = [];
										store.rejectChanges();
									}
								}
							},
							callback : function( results ){
								mask.hide();
							}
						}, record, store );

					} else
					if (config.action === 'invoice') {
							var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
							mask.show();

							//console.debug( 'ddddddddddddd');
							if (autosync) {
								store.removed.push(record);
							}
							config.callback({
								success : true,
								feedback : function ( results ) {
									if (results.success){ // 저장이 성공된 경우

										if (autosync) {
											store.remove (record);
											store.removed = [];
										}
										me.getForm().reset(true);
									} else { // 저장을 실패한경우
										if (autosync) {
											store.removed = [];
											store.rejectChanges();
										}
									}
								},
								callback : function( results ){
									mask.hide();
								}
							}, record, store );
					} else {
						console.debug ('삭제될 소스를 사용중임 ') ;

						var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
						mask.show();
						if (autosync) {
							store.removed.push(record);
						}
						config.callback({
							success : true,
							feedback : function ( results ) {
								if (results.success){ // 저장이 성공된 경우
									if (autosync) {
										if (store instanceof Ext.data.TreeStore ) {
											record.remove();
										} else {
											store.remove (record);
										}
										store.removed = [];
									}
									me.getForm().reset(true);
									me.collapse(false);
								} else { // 저장을 실패한경우
									if (autosync) {
										store.removed = [];
										store.rejectChanges();
									}
								}
							},
							callback : function( results ){
								mask.hide();
							}
						}, record, store );
					}
				}
			}
		});
	}





});


// 	deleteRecord : function(config) {
// 		var me = this, cancelDelete = false;
// 		var records = config.lister.getSelectionModel().getSelection();
// 		if (records && records.length > 0){
//
// 			/* befor 메소드를 호출하여, 삭제 가능 여부를 최종 통보 받도록 한다. */
// 			if (config.before) {
// 				config.before(records, { rejectDelete : function () { cancelDelete = true ; } });
// 			}
//// 			Const.DELETE.showConfirm( function ( button ) {
//// 				if (button === 'no') {
//// 					console.debug( 'confirm no ');
//// 					cancelDelete = true ;
//// 				}
//// 			});
// 			if (cancelDelete){ console.debug( 'cancel delete' );  return; }
// 			//console.debug( 'xxx ');
//			Ext.Msg.show({ title: '삭제확인', msg: '데이터를 삭제하시겟습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
//				fn : function (button) {
//					if (config.callback && (button==='yes')) {
// 		 				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
// 						mask.show();
//
// 	 					var store = config.lister.getStore();
// 	 					if (config.autosync) {
// 	 						Ext.each(records, function(record) {
// 	 	 						store.removed.push(record);
// 	 						});
// 	 					}
// 		 				config.callback({
// 		 					success : true,
// 		 					feedback : function ( results ) {
// 		 						if (results.success){ // 저장이 성공된 경우
// 		 		 					if (config.autosync) {
// 		 		 						store.remove (records);
// 		 		 						store.removed = [];
// 		 		 					}
// 		 							me.getForm().reset(true);
// 		 							me.collapse(false);
//								} else { // 저장을 실패한경우
// 		 		 					if (config.autosync) {
// 		 		 						store.removed = [];
// 		 		 						store.rejectChanges();
// 		 		 					}
// 								}
// 		 					},
// 		 					callback : function( results ){
// 		 						mask.hide();
// 		 					}
// 		 				}, records, store );
// 		 			}
//				}
//			});
//
// 		} else { Ext.Msg.alert( Const.ERROR , Const.NOVALUE_DELETE );} // 선택된 데이터가 없을때
// 	},
//


