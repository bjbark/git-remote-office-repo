Ext.define('module.custom.dhtec.prod.bomwork.BomWork', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.WkfwPopup',
		'lookup.upload.FileUpload'
	],

	models	: [
		'module.custom.dhtec.prod.bomwork.model.BomWorkMaster',
		'module.custom.dhtec.prod.bomwork.model.BomWorkDetail3',
		'module.custom.dhtec.prod.bomwork.model.BomWorkTree',
		'module.custom.dhtec.prod.bomwork.model.BomWorkTree2',
		'module.custom.dhtec.prod.bomwork.model.BomWorkModel1',
		'module.custom.dhtec.prod.bomwork.model.BomWorkModel2',
	],
	stores	: [
		'module.custom.dhtec.prod.bomwork.store.BomWorkMaster',
		'module.custom.dhtec.prod.bomwork.store.BomWorkDetail3',
		'module.custom.dhtec.prod.bomwork.store.BomWorkTree',
		'module.custom.dhtec.prod.bomwork.store.BomWorkTree2',
		'module.custom.dhtec.prod.bomwork.store.BomWorkStore1',
		'module.custom.dhtec.prod.bomwork.store.BomWorkStore2'
	],
	views	: [
		'module.custom.dhtec.prod.bomwork.view.BomWorkLayout',
		'module.custom.dhtec.prod.bomwork.view.BomWorkSearch',
		'module.custom.dhtec.prod.bomwork.view.BomWorkListerMaster',
		'module.custom.dhtec.prod.bomwork.view.BomWorkTree',
		'module.custom.dhtec.prod.bomwork.view.BomWorkTree2',
		'module.custom.dhtec.prod.bomwork.view.BomWorkListerDetail3',
		'module.custom.dhtec.prod.bomwork.view.BomWorkFinder',
		'module.custom.dhtec.prod.bomwork.view.BomWorkFinder2',
		'module.custom.dhtec.prod.bomwork.view.BomWorkLister1',
		'module.custom.dhtec.prod.bomwork.view.BomWorkLister2'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			//'module-bomwork-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-bomwork-layout #mainpanel'							: { tabchange : me.selectAction },
			// lister detail event
			'module-bomwork-tree button[action=modifyAction]'	: { click : me.modifyAction },	// 수정
			'module-bomwork-tree button[action=insertAction]'	: { click : me.insertAction },	// 신규
			'module-bomwork-tree2 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-bomwork-tree2 button[action=deleteAction]'	: { click : me.deleteAction },	// 삭제
			'module-bomwork-tree2 button[action=updateAction]'	: { click : me.updateAction2 },	// 저장
			'module-bomwork-tree button[action=changeAction]'	: { click : me.changeAction1}, /* 설계일정 조정   */
			'module-bomwork-tree button[action=copyAction]'		: { click : me.copyAction   }, /* 설계일정 조정   */
			'module-bomwork-tree button[action=bomInsert]'		: { click : me.bomInsert    }, /* BOM작성   */
			'module-bomwork-tree button[action=prorAction]'		: { click : me.prorAction   }, /* 작업지시   */
			'module-bomwork-tree button[action=testExcel]'		: { click : me.testExcel    }, /* testExcel   */
			'module-bomwork-tree button[action=approveAction]'	: { click : me.approveAction}, /* 승인   */
			'module-bomwork-tree button[action=approveCancel]'	: { click : me.approveCancel}, /* 승인취소   */
			// editer event
			'module-bomwork-editor button[action=updateAction]'	: { click : me.updateAction },	// 저장
			'module-bomwork-editor button[action=cancelAction]'	: { click : me.cancelAction },	// 취소
			'module-bomwork-finder button[action=updateAction]'	: { click : me.finderUpdateAction },	// 저장
//			'module-bomwork-finder button[action=bomReport]'	: { click : me.ReportUpdateAction },	// 부품식별표 발행 (리포트)
			'module-bomwork-finder2 button[action=updateAction]': { click : me.finderUpdateAction },	// 저장

			// lister master event
			'module-bomwork-tree' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-bomwork-tree2' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			/* --------------------------------------------------------- */
			'module-bomwork-layout	button[action=selectAction]'		: { click: me.selectAction2 },	// 조회
			'module-bomwork-lister2	button[action=updateAction]'		: { click: me.updateAction3 },
			'module-bomwork-lister1': {
				itemclick: me.selectBomMast
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-bomwork-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-bomwork-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-bomwork-lister-master')[0] },
		listertree	: function () { return Ext.ComponentQuery.query('module-bomwork-tree')[0] },
		listertree2	: function () { return Ext.ComponentQuery.query('module-bomwork-tree2')[0] },
		listerdetail3: function () { return Ext.ComponentQuery.query('module-bomwork-lister-detail3')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-bomwork-editor')[0] },
		finder		: function () { return Ext.ComponentQuery.query('module-bomwork-finder')[0] },
		finder2		: function () { return Ext.ComponentQuery.query('module-bomwork-finder2')[0] },
		/* --------------------------------------------------------- */
		lister1		: function() { return Ext.ComponentQuery.query('module-bomwork-lister1')[0] },
		lister2		: function() { return Ext.ComponentQuery.query('module-bomwork-lister2')[0] }
	},
	
	selectAction2: function() {
		var me = this,
			lister1 = me.pocket.lister1();
		
		lister1.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {
				}
			},
			scope:me
		}, {});
	},
	
	selectBomMast: function(grid, record, item, index) {
		var lister2 = this.pocket.lister2();
		
		lister2.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {
				}
			},
			scope:this
		}, {prnt_item_idcd: record.get('item_idcd'), revs_numb: '1', revs_dvcd: '1'});
	},
	
	updateAction3: function() {
		var lister1 = this.pocket.lister1(),
			store = this.pocket.lister2().getStore(),
			prntItem = lister1.getSelectionModel().getSelection()[0],
			maxSeqn = undefined,
			mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });;
			
		if (prntItem === undefined) {
			Ext.Msg.alert('알림','제품을 선택해주세요.');
			return false;
		} else {
			prntItem = prntItem.get('item_idcd');
			maxSeqn = this.getMaxSeqn(prntItem) + 1;
		}
		mask.show();
		Ext.Array.each(store.getNewRecords(), function(rec) {
			rec.set('prnt_item_idcd', prntItem);
			rec.set('line_seqn', maxSeqn++);
		});
		store.sync({
			success : function(operation) {
				store.reload();
			},
			failure : function(operation) {
			},
			callback: function(operation){
				mask.hide();
			},
		})
	},
	
	getMaxSeqn: function(itemIdcd) {
		var maxSeqn = 0;
		
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/dhtec/prod/bomwork/get/maxseqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					prnt_item_idcd	: itemIdcd,
					revs_numb		: 1,
					revs_dvcd		: 1
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				
				if (result.records[0]) {
					maxSeqn = result.records[0].max_seqn;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		
		return maxSeqn;
	},

	//조회
	selectAction:function() {
		var me = this,
			listertree	= me.pocket.listertree(),
			listertree2	= me.pocket.listertree2(),
			finder		= me.pocket.finder(),
			search = me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			tpanel		= me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if(pjod_idcd!=''){
			if(tindex == 0){
				lister = listertree;
				lister.getStore().clearData();
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister.getStore().load({
					params:{param:JSON.stringify({pjod_idcd:pjod_idcd}) }
				, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						lister.getRootNode().expand();
						lister.getSelectionModel().select(0);
						mask.hide();
					} else {
					}
				}
				});
			}else if(tindex==1){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister = listertree2;
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge({stor_id : _global.stor_id,pjod_idcd:pjod_idcd}) );
			}
		}else{
			Ext.Msg.alert('알림',Language.get('pjod_idcd', '금형번호')+'를 선택해주세요.');
		}
	},




	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;

		editor.modifyRecord({
			caller	: me,
			callback: function( results ){
				if (results.success){
					results.feedback( {success : true, visible : true } );
				}me.pocket.layout().down('#mainpanel').setDisabled(true);
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			param = search.getValues(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]
			sub = listerdetail.down('#sub').grid.store.data.length;
		;
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/listener/seq/maxid.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'cvic_chck',
							invc_numb	: mrecord.get('cvic_idcd')
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( listerdetail.getStore().model.modelName,{
								cvic_idcd :  mrecord.get('cvic_idcd'),
								cvic_name : mrecord.get('cvic_name'),
								line_seqn : sub+1
							}),
							listerdetail: listerdetail,
							disables	: [me.pocket.layout().down('#mainpanel')],
//							disables	: [me.pocket.layout().down('#itempanel')],
							callback: function (results){
								if (results.success) {
									results.feedback({success : true , visible : true });
								}
							}
						});
					}
				}
			});
	},
	updateAction2:function() {
		var me = this,
			listertree2 = me.pocket.listertree2(),
			store  = listertree2.getStore()
		;
		store.sync({
			success : function(operation){ store.reload()},
			failure : function(operation){ results.feedback({success : false });},
			callback: function(operation){ },
		});

	},
	updateAction:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			store  = listerdetail.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('cvic_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'cvic_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cvic_idcd' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); },
					} );
				}
			},
			finished : function(results, record, operation){
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				if (results.success){
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
						}
				}
			}
		});
	},
	finderUpdateAction:function() {
		var me = this,
			listertree	= me.pocket.listertree(),
			listertree2	= me.pocket.listertree2(),
			tpanel		= me.pocket.layout().down('#mainpanel'),
			tindex		= tpanel.items.indexOf(tpanel.getActiveTab()),
			record,finder,store,tapidx
		;
		if(tindex == 0){
			record	= listertree.getSelectionModel().getSelection()[0]
			store	= listertree.getStore();
			finder	= me.pocket.finder();
			tapidx  = 0;
		}else if(tindex==1){
			record	= listertree2.getSelectionModel().getSelection()[0]
			store	= listertree2.getStore();
			finder	= me.pocket.finder2();
			tapidx  = 1;
		}
		if(record){
			var	pjod_idcd  = record.data.pjod_idcd,
				item_idcd  = record.data.item_idcd,
				line_seqn  = record.data.line_seqn,
				chek1	   = finder.down('[name=imge_chek1]').getValue(),
				chek2	   = finder.down('[name=imge_chek2]').getValue(),
				imge_1fst  = finder.down('[name=image]').src,
				imge_2snd = finder.down('[name=image2]').src,
				chk1=0, chk2=0,
				param={}
			;
			if(imge_1fst){
				if(chek1 == "" || chek1 == undefined){
					chk1 = 3;
				}
				else{
					chk1 = 1;
				}
			}
			if(imge_2snd){
				if(chek2 == "" || chek2 == undefined){
					chk2=3;
				}else{
					chk2=1;
				}
			}
			var uploadForm = finder.down('[name=uploadForm]');
			param.stor_grp	= _global.stor_grp;
			param.stor_id	= _global.stor_id;
			param.chk1		= chk1;
			param.chk2		= chk2;
			param.tapidx	= tapidx;
			param.pjod_idcd	= pjod_idcd;
			param.item_idcd	= item_idcd;
			param.line_seqn	= line_seqn;

			Ext.merge(param, this.params);
			uploadForm.getForm().setValues({
				param : JSON.stringify(param)
			});
			// submit
			uploadForm.getForm().submit({
				waitMsg:this.waitMsg, // progressbar 띄우기
				success:function(form, action){
					store.reload();
					finder.down('[name=image]').setSrc('');
					finder.down('[name=imge_1fst]').setValue('');
					finder.down('[name=files]').fileInputEl.dom.value = '';

					finder.down('[name=image2]').setSrc('');
					finder.down('[name=imge_2snd]').setValue('');
					finder.down('[name=files]').fileInputEl.dom.value = '';
				},
				failure: function(form, action) {
					Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
				}
			});
		}else{
			Ext.Msg.alert('알림','투입자재를 선택해주세요.');
		}

	},
	attachRecord:function( smodel, record ){
		var me	= this
			listertree	= me.pocket.listertree(),
			listertree2	= me.pocket.listertree2(),
			tpanel		= me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var finder;
		if(tindex==0){
			finder = me.pocket.finder();
		}else if(tindex==1){
			finder = me.pocket.finder2();
		}
		finder.down('[name=imge_1fst]').setValue('');
		finder.down('[name=imge_2snd]').setValue('');

	},
	copyAction:function(){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			select = listerdetail1.getSelectionModel().getSelection()[0],
			store = listerdetail1.getStore(),
			plan_dvcd = 'dsig',
			search = me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			msg,
			chk
		;
		if(pjod_idcd){
			if(select){
				msg = '이미 처리된 일정계획입니다. 대일정을 가져오시겠습니까?';
			}else{
				msg = '대일정을 가져오시겠습니까?';
			}
			Ext.Msg.show({ title: '확인', msg: msg, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/design/bomwork/get/getPrint.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									invc_numb		: pjod_idcd,
									plan_dvcd		: plan_dvcd
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									store.reload();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}else{
						return;
					}
				}
			});
		}else{
			Ext.Msg.error(Language.get('pjod_idcd', '금형번호')+'를 확인해주세요.');
		}
	},
	//선택
	selectDetail : function(grid, record) {
		var me = this,
			tpanel		= me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			finder,imge_1fst,imge_2snd
		;
		if(tindex == 0){
			 finder = me.pocket.finder()
		}else if(tindex == 1){
			 finder = me.pocket.finder2()
		}
		Ext.Ajax.request({
			url		:  _global.location.http() + '/design/bomwork/get/getImage.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					pjod_idcd	: record.get('pjod_idcd'),
					line_seqn	: record.get('line_seqn')
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					imge_1fst = result.records[0].imge_1fst;
					imge_2snd = result.records[0].imge_2snd;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		if (record && finder) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			finder.down('[name=imge_1fst]').setValue(imge_1fst);
			finder.down('[name=imge_2snd]').setValue(imge_2snd);
			mask.hide();
		}
	},

	//삭제
	deleteAction : function() {
		var me = this,
			listertree2	= me.pocket.listertree2(),
			selected	= listertree2.selModel.getSelection()[0]
		;
		if(selected){
			Ext.Msg.show({ title: '확인', msg: '삭제하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/design/bomwork/set/delete.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									item_idcd		: selected.data.item_idcd
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									listertree2.getStore().reload();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
				}
			});
		}else{
			Ext.Msg.error("삭제하려는 투입 자재를 선택해주세요.");
		}
	},

	//취소
	cancelAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},
	changeAction1:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
			a = _global.api_host_info,
			search_url	= '/system/ganttchart/getGanttProjectDesign1.do',
			update_url	= '/system/ganttchart/setGanttProjectDesign1.do',
			search = me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			invc_numb	= pjod_idcd,
			schd_dvcd	= 2000,
			url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\',schd_dvcd:\''+schd_dvcd+'\'}'
		;
		if(pjod_idcd == null||pjod_idcd ==""){
			Ext.Msg.alert("error",Language.get('pjod_idcd', '금형번호')+' 조회 후 조정가능합니다.');
		}else{
			if(chk.length ==0||chk[0].style.display=="none"){
				var win = Ext.create("Ext.window.Window",
					{	title : '설계일정 관리',
						height:700,
						width:1500,
						maximizable : true,
						id : 'gantt_window',
		//				minimizable : true,
						html:'<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="100%" height="100%">iframe</iframe>',
						listeners : {
							show : function (win) {
								win.maximize ();
							},
							minimize: function(data) {
								win.setVisible(false);
								var a;
								var button = Ext.create('Ext.Button', {
									text: data.title,
									style: 'z-index: 9999!important',
									draggable :true,
									renderTo: Ext.getBody(),
									listeners : {
										move : function (e) {// dropped
											a = 1;
										},
										click : function(e) {
											if(a==1){
												x = button.getX();
												y = button.getY();
												temp = 1;
												a = 0;
												return;
											}else{
												win.setVisible(true);
												this.destroy();
											}
										}
									}
								});
								if(temp == 0){
									button.setX(200);
									button.setY(850);
								}else{
									button.setX(x);
									button.setY(y);
								}
							}
						}
				}); win.show();
			}
		}
	},
	//승인
	approveAction:function(){
		var me			= this,
			search		= me.pocket.search(),
			listertree	= me.pocket.listertree(),
			select		= listertree.selModel.getSelection()[0],
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			line_clos	= select.get('line_clos')
		;
		if(select.get('line_clos') ==0){
			Ext.Msg.show({ title: '확인', msg: '승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/design/bomwork/set/setApprove.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									pjod_idcd		: pjod_idcd,
									updt_idcd		: _global.login_id,
									line_clos		: '1'
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									me.selectAction();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}else{
						return;
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","승인할 수 없는 내역입니다.");
		}
	},
	//승인취소
	approveCancel:function(){
		var me			= this,
			search		= me.pocket.search(),
			listertree	= me.pocket.listertree(),
			select		= listertree.selModel.getSelection()[0],
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			line_clos	= select.get('line_clos')
		;
		if(select.get('line_clos') == 1){
			Ext.Msg.show({ title: '확인', msg: '승인취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/design/bomwork/set/setApprove.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									pjod_idcd		: pjod_idcd,
									updt_idcd		: _global.login_id,
									line_clos		: '0'
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									me.selectAction();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}else{
						return;
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","승인을 취소할 수 없는 내역입니다.");
		}
	},
	testExcel:function(){
		var me			= this,
			search = me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			selected = me.pocket.listertree().selModel.getSelection()[0],
			max_line_seqn = 1,
			chek = me.pocket.listertree().down('[name=uploadChek]').getValue()
		;
		if(!pjod_idcd){
			Ext.Msg.alert('알림',Language.get('acpt_numb', '금형코드')+' 선택 후 진행가능합니다.');
		}else{
			resource.loadPopup({
				widget : 'file-upload-popup',
				apiurl : {
					upload : _global.location.href + '/system/design/bomwork/get/excel.do', // url (필수)
				},
				params : {
					line_seqn : max_line_seqn,
					pjod_idcd : pjod_idcd,
					qntt	  : selected.data.need_qntt,
					chek	  : chek,
				},
				title			: '설계자료 업로드',				// popup title (옵션)
				waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
				allowExtension	: ['xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
				uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
					text : '엑셀 Upload'
				},
				listeners: {
					close:function(){
					}
				}
			});
		}
	},
	bomInsert:function(){
		var me			= this,
			finder		= me.pocket.finder(),
			search		= me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			store	= me.pocket.listertree().getStore(),
			listertree = me.pocket.listertree()
		;
		if(pjod_idcd==''){
			Ext.Msg.alert('알림',Language.get('pjod_idcd', '금형번호')+'를 선택해주세요.');
		}else{
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 60,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '이미 작성된 BOM구조가 초기화됩니다. 진행하시겠습니까?',
						height		: 30,
					},{	fieldLabel	: Language.get('standard','표준BOM'),
						xtype		: 'lookupfield',
						name		: 'standard',
						value		: 'standard1',
						lookupValue	: [["standard1","표준"],["standard2"," 단순형"],["standard3","복합형"],["standard4","다중복합형"]],
						value		: '',
						labelWidth	: 110,
						width		: 210,
					},
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">예</span>',
						cls: 'button-style',
						handler: function() {
							var me2 = this;
							var param = Ext.merge(this.up('form').getValues());
							if(param.standard){
								Ext.Ajax.request({
									url		: _global.location.http() + '/design/bomwork/set/setBom.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											pjod_idcd		: pjod_idcd,
											standard		: param.standard
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);
										if	(!result.success ){
											Ext.Msg.error(result.message );
											return;
										} else {
											store.load({
												params:{param:JSON.stringify({pjod_idcd:pjod_idcd}) }
											, scope:me,
											callback:function(records, operation, success) {
												if (success) {
													listertree.getRootNode().expand();
													listertree.getSelectionModel().select(0);
												} else {
												}
											}
										});
											me2.up('window').hide();
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
							}else{
								Ext.Msg.error('표준BOM을 선택해주세요.' );
							}
						}
					},
					{	text: '<span class="btnTemp" style="font-size:1em">아니오</span>',
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				],

			});

			win = Ext.widget('window', {
				title: 'BOM작성',
				closeAction: 'hide',
				width: 320,
				height: 150,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: 'insp_qntt'
			});
			win.show();
		}
	},

	prorAction : function(){
		var me		= this,
			listertree	= me.pocket.listertree(),
			select		= listertree.selModel.getSelection()[0]
		;

		Ext.Ajax.request({
			url		: _global.location.http() + '/design/bomwork/set/setWorkBook.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					pjod_idcd		: select.get('pjod_idcd'),
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					Ext.Msg.alert('알림', '작업지시가 완료되었습니다.');
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listertree2().writer({enableLoadMask:true});
	}
});