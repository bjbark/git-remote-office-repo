Ext.define('module.custom.hantop.prod.order.prodorder2.ProdOrder2', { extend : 'Axt.app.Controller',


	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
	],

	models:[
		'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Master',
		'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail',
		'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail4',
		'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail3',
		'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail3_2',
	],
	stores:[
		'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Master',
		'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail',
		'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail3',
		'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail3_2',
		'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail4',
	],
	views : [
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2Layout',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2Search',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerMaster',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail4',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_BF',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_SF',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_MF',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_MC',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_GB',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_GL',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_RN',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2Detail3Search',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2Popup',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2CutPopup',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2CofmPopup',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2OptmPopup',
		'module.custom.hantop.prod.order.prodorder2.view.ProdItemCancelPopup',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetailEditor',
		'module.custom.hantop.prod.order.prodorder2.view.ProdOrder2WorkerSearch'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-prodorder2-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-prodorder2-lister-master button[action=reworkAction]'			: { click : me.reworkAction       }, /* 최적화 */
			'module-prodorder2-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-prodorder2-lister-master menuitem[action=confmAction]'			: { click : me.confmAction        }, /* 확정 */
			'module-prodorder2-lister-master menuitem[action=cofmCancelAction]'		: { click : me.cofmCancelAction   }, /* 확정취소 */
			'module-prodorder2-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */

			'module-prodorder2-layout button[action=enrollment]'					: { click : me.enrollment         }, //1건등록(<)
			'module-prodorder2-layout button[action=remove]'						: {	click : me.remove             }, //1건삭제(>)

			'module-prodorder2-lister-detail3 button[action=exportAction]'			: { click : me.exportAction3      }, /* 엑셀 */
			'module-prodorder2-lister-detail3_bf button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder2-lister-detail3_gb button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder2-lister-detail3_gl button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder2-lister-detail3_mc button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder2-lister-detail3_mf button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder2-lister-detail3_rn button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder2-lister-detail3_sf button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */

			'module-prodorder2-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},

			'module-prodorder2-layout #detailpanel' : {
				tabchange : me.mainTabChange3
			},
			'module-prodorder2-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-prodorder2-lister-detail' : {
				itemdblclick    : me.dblclickDetail,
				selectionchange : me.dblclickRecord,
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout           : function () { return Ext.ComponentQuery.query('module-prodorder2-layout')[0] },
		search           : function () { return Ext.ComponentQuery.query('module-prodorder2-search')[0] },
		detail3search    : function () { return Ext.ComponentQuery.query('module-prodorder2-detail3-search')[0] },
		master           : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-master')[0] },
		detail           : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail')[0] },
		detail3          : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail3')[0] },
		detail4          : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail4')[0] },
		detail3_bf       : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail3_bf')[0] },
		detail3_sf       : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail3_sf')[0] },
		detail3_mf       : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail3_mf')[0] },
		detail3_mc       : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail3_mc')[0] },
		detail3_gb       : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail3_gb')[0] },
		detail3_gl       : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail3_gl')[0] },
		detail3_rn       : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detail3_rn')[0] },
		editor           : function () { return Ext.ComponentQuery.query('module-prodorder2-lister-detaileditor')[0] },
		workersearch     : function () { return Ext.ComponentQuery.query('module-prodorder2-worker-search')[0] },
	},

	//조회
	selectAction:function() {
		var me			= this,
			lister		= me.pocket.master(),
			detail4		= me.pocket.detail4()
			search		= me.pocket.search(),
			tabPanel	= me.pocket.layout().down('#mainpanel'),
			tindex		= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			param		= search.getValues()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		if(tindex==0){
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}else if(tindex==1){
			detail4.select({
				callback:function(records, operation, success) {
					if (success) {
						detail4.getSelectionModel().select(0);
					} else { }
						mask.hide();
					}, scope:me
			}, Ext.merge({ stor_grp : _global.stor_grp }));
		}
	},

	mainTabChange : function(tabPanel, newCard, oldCard){
		var me			= this,
			lister		= me.pocket.master(),
			search		= me.pocket.search(),
			param		= search.getValues()
			tindex		= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			detail3		= me.pocket.detail3(),
			workersearch= me.pocket.workersearch(),
			detail4		= me.pocket.detail4()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		if(tindex==0){
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}else if(tindex == 1){
			workersearch.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/listener/seq/maxid.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'cut_plan_mast'
						})
					}
				},
				callback : function (keygen) {
					if (keygen.success) {
						workersearch.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								invc_numb : keygen.records[0].seq,
							}),
							lister	: me.pocket.workersearch(),
							callback: function (results) {
								if (results.success) {
									results.feedback({success : true , visible : true });
								}
							}
						});
					}
				}
			});
			detail3.getStore().clearData();
			detail3.getStore().loadData([],false);

			detail4.select({
				callback:function(records, operation, success) {
					if (success) {
//						detail4.getSelectionModel().select(0);
					} else { }
						mask.hide();
					}, scope:me
			}, Ext.merge({ stor_grp : _global.stor_grp }));
		}
	},

	mainTabChange3 : function(tabPanel, newCard, oldCard){
		var me				= this,
			tindex			= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			detail3search	= me.pocket.detail3search(),
			values			= detail3search.getValues(),
			detailRecord	= me.pocket.detail().getSelectionModel().getSelection()[0],
			detail,
			bfsf_dvcd = '', rn_dvcd=''
		;
		if(detailRecord){
			if( tindex == 0 ){
				detail = me.pocket.detail3_bf();
				bfsf_dvcd = 'bf';
			}else if(tindex==1){
				detail = me.pocket.detail3_sf();
				bfsf_dvcd = 'sf';
			}else if(tindex==2){
				detail = me.pocket.detail3_mf();
				bfsf_dvcd = 'mf';
			}else if(tindex==3){
				detail = me.pocket.detail3_mc();
				bfsf_dvcd = 'mc';
			}else if(tindex==4){
				detail = me.pocket.detail3_gb();
				bfsf_dvcd = 'gb';
			}else if(tindex==5){
				detail = me.pocket.detail3_gl();
				bfsf_dvcd = 'glss';
			}else if(tindex==6){
				detail = me.pocket.detail3_rn();
				rn_dvcd = 'rn';
			}

			if(detail){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
				mask.show();
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope:detail
				}, Ext.merge({ auto_yorn : values.auto_yorn
							 , cmpl_yorn : values.cmpl_yorn
							 , bfsf_dvcd : bfsf_dvcd
							 , rn_dvcd   : rn_dvcd
							 , cofm_yorn : '1'
							 , invc_numb : detailRecord.data.invc_numb
							 , line_seqn : detailRecord.data.line_seqn
					}, { stor_grp : _global.stor_grp }));
			}
		}else{
			Ext.Msg.alert('알림','계획을 조회하여 주십시오.');
			return;
		}

	},

	//선택
	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	//디테일 조회
	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.detail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}
	},

	//선택
	dblclickRecord:function( grid, records ){
		var me = this,
			detail3_bf = me.pocket.detail3_bf(),
			detail3_sf = me.pocket.detail3_sf(),
			detail3_mf = me.pocket.detail3_mf(),
			detail3_mc = me.pocket.detail3_mc(),
			detail3_gb = me.pocket.detail3_gb(),
			detail3_gl = me.pocket.detail3_gl(),
			detail3_rn = me.pocket.detail3_rn()
		;
		detail3_bf.getStore().clearData();
		detail3_bf.getStore().loadData([],false);
		detail3_sf.getStore().clearData();
		detail3_sf.getStore().loadData([],false);
		detail3_mf.getStore().clearData();
		detail3_mf.getStore().loadData([],false);
		detail3_mc.getStore().clearData();
		detail3_mc.getStore().loadData([],false);
		detail3_gb.getStore().clearData();
		detail3_gb.getStore().loadData([],false);
		detail3_gl.getStore().clearData();
		detail3_gl.getStore().loadData([],false);
		detail3_rn.getStore().clearData();
		detail3_rn.getStore().loadData([],false);
	},


	//디테일 조회
	dblclickDetail : function(grid, record) {
		var me         = this,
			tabPanel   = me.pocket.layout().down('#detailpanel'),
			tindex     = tabPanel.items.indexOf(tabPanel.getActiveTab()),
			detail3search = me.pocket.detail3search(),
			values     = detail3search.getValues(),
			detail, bfsf_dvcd = '', rn_dvcd='',
			master			= me.pocket.master(),
			detail			= me.pocket.detail(),
			detailRecord	= detail.getSelectionModel().getSelection()[0]
		;
		if(detailRecord){
			detail3search.getForm().setValues(detailRecord.data);

			if( tindex == 0 ){
				detail = me.pocket.detail3_bf();
				bfsf_dvcd = 'bf';
			}else if(tindex==1){
				detail = me.pocket.detail3_sf();
				bfsf_dvcd = 'sf';
			}else if(tindex==2){
				detail = me.pocket.detail3_mf();
				bfsf_dvcd = 'mf';
			}else if(tindex==3){
				detail = me.pocket.detail3_mc();
				bfsf_dvcd = 'mc';
			}else if(tindex==4){
				detail = me.pocket.detail3_gb();
				bfsf_dvcd = 'gb';
			}else if(tindex==5){
				detail = me.pocket.detail3_gl();
				bfsf_dvcd = 'glss';
			}else if(tindex==6){
				detail = me.pocket.detail3_rn();
				rn_dvcd = 'rn';
			}

			if(detail){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
				mask.show();
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope:detail
				}, Ext.merge({ auto_yorn : values.auto_yorn
							 , cmpl_yorn : values.cmpl_yorn
							 , bfsf_dvcd : bfsf_dvcd
							 , rn_dvcd   : rn_dvcd
							 , cofm_yorn : '1'
							 , invc_numb : record.get('invc_numb')
							 , line_seqn : record.get('line_seqn')
					}, { stor_grp : _global.stor_grp }));
			}
		}else{
			Ext.Msg.alert('알림','계획을 조회하여 주십시오.');
			return;
		}


	},


	reworkAction : function(){
		var me   = this,
			master			= me.pocket.master(),
			masterRecord	= master.getSelectionModel().getSelection(),
			fix_yorn	= 0,
			n = 0
		;
		for (var j = 0; j < masterRecord.length; j++) {
			if(masterRecord[j].get('cofm_yorn') == 1){
				n = 1;
				break;
			}
		}

		if(masterRecord.length > 0){
			if(n == 1){
				Ext.Msg.alert('알림','확정되어 최적화 할 수 없는 계획입니다.');
				return;
			}else{
				Ext.Msg.confirm("확인", "최적화를 진행하시겠습니까?", function(button) {
					if (button == 'yes') {
						var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
						mask.show();
						var a = '';
						var plan_date, run_mode = '';
						for(var i =0; i< masterRecord.length ; i++){
							if(i==0){
								a += "[";
							}
							plan_date = masterRecord[i].get('plan_date');
							a+= '{\'invc_numb\':\''+masterRecord[i].get('invc_numb')+'\',\'plan_date\':'+plan_date+'\}';
							if(i != masterRecord.length -1){
								a+=",";
							}else{
								a+="]";
							}
						}

						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/set/optm.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id		: _global.stor_id,
									run_mode	: '',
									records		: a
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
									master.getStore().reload();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								mask.hide();
							}
						});
					}
				});
			}
		}else{
			Ext.Msg.alert('알림','계획을 선택하여 주십시오.');
			return;
		}
	},

	deleteAction : function(){
		var me			= this,
			master		= me.pocket.master(),
			masterRecord= master.getSelectionModel().getSelection(),
			n = 0
		;
		for (var i = 0; i < masterRecord.length; i++) {
			if(masterRecord[i].get('cofm_yorn') == 1){
				n = 1;
				break;
			}
		}
		if(masterRecord){
			if(n == 1){
				Ext.Msg.alert('알림','확정된 계획은 삭제하실 수 없습니다.');
				return;
			}else{
				Ext.Msg.confirm("확인", "선택하신 계획 건을 삭제하시겠습니까?", function(button) {
					if (button == 'yes') {
						for (var i = 0; i < masterRecord.length; i++) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/set/del_yn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id		: _global.stor_id,
										invc_numb	: masterRecord[i].get('invc_numb'),
										acpt_numb	: masterRecord[i].get('acpt_numb')
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
										master.getStore().reload();
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						}
					}
				})
			}
		}
	},

	confmAction : function(grid,record){
		var me			= this,
			master		= me.pocket.master(),
			masterRecord= master.getSelectionModel().getSelection(),
			n = 0, fix_yorn = 1, invc = [], a = ''
		;
		for (var i = 0; i < masterRecord.length; i++) {
			if(masterRecord[i].get('cofm_yorn') == 1){
				n = 1;
				break;
			}
			a+= masterRecord[i].get('invc_numb');
			if(i != masterRecord.length -1){
				a+=",";
			}
		}

		if(n == 1){
			Ext.Msg.alert('알림','이미 확정된 계획입니다.');
			return;
		}else{
			var rec = '';
			// 계획 item별 acpt_numb 얻기. (중복제외)
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/get/detail2.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						invc_numb	: a
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
						for (var j = 0; j < result.records.length; j++) {
							if(j==0){
								rec += "[";
							}
							rec+= '{\'invc_numb\':\''+result.records[j].acpt_numb+'\',\'orig_invc\':\''+result.records[j].invc_numb+'\'}';
							if(j != masterRecord.length -1){
								rec+=",";
							}else{
								rec+="]";
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			var _param = '{\'fix_yorn\':'+fix_yorn+',\'cofm_dttm\':\''+Ext.Date.format(new Date(),'Ymd')+'\',\'records\':'+rec+'}';
			}

			Ext.Msg.confirm("확인", "선택하신 계획 건을 확정하시겠습니까?", function(button) {
				//확정 프로시저
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/set/cofm.do',
					params	: {
						token : _global.token_id,
						param : _param
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							master.getStore().reload();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			});
	},

	cofmCancelAction : function(grid,record){
		var me			= this,
			master		= me.pocket.master(),
			masterRecord= master.getSelectionModel().getSelection(),
			n = 0, fix_yorn = 0, invc = [], a = ''
		;

		for (var i = 0; i < masterRecord.length; i++) {
			if(masterRecord[i].get('cofm_yorn') == 0){
				n = 1;
				break;
			}

			a+= masterRecord[i].get('invc_numb');
			if(i != masterRecord.length -1){
				a+=",";
			}
		}

		if(n == 1){
			Ext.Msg.alert('알림','확정된 계획을 선택해주십시오.');
			return;
		}else{
			var rec = '';
			// 계획 item별 acpt_numb 얻기. (중복제외)
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/get/detail2.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						invc_numb	: a
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
						for (var j = 0; j < result.records.length; j++) {
							if(j==0){
								rec += "[";
							}
							rec+= '{\'invc_numb\':\''+result.records[j].acpt_numb+'\',\'orig_invc\':\''+result.records[j].invc_numb+'\'}';
							if(j != masterRecord.length -1){
								rec+=",";
							}else{
								rec+="]";
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			var _param = '{\'fix_yorn\':'+fix_yorn+',\'cofm_dttm\':\''+''+'\',\'records\':'+rec+'}';
			}

			Ext.Msg.confirm("확인", "선택하신 계획 건을 확정 취소하시겠습니까?", function(button) {
				//확정 프로시저
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/set/cofm.do',
					params	: {
						token : _global.token_id,
						param : _param
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							master.getStore().reload();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			});
	},


	//엑셀
	exportAction : function(self) {
		this.pocket.master().writer({enableLoadMask:true});
	},

	//엑셀2
	exportAction2 : function(self) {
		this.pocket.detail().writer({enableLoadMask:true});
	},
	exportAction3 : function(self) {
		this.pocket.detail3().writer({enableLoadMask:true});
	},
	exportActions : function(self) {
		var	me = this,
			lister
		;
		switch (self.itemId) {
		case 'bf':
			lister = me.pocket.detail3_bf()
			break;
		case 'gb':
			lister = me.pocket.detail3_gb()
			break;
		case 'gl':
			lister = me.pocket.detail3_gl()
			break;
		case 'mc':
			lister = me.pocket.detail3_mc()
			break;
		case 'mf':
			lister = me.pocket.detail3_mf()
			break;
		case 'rn':
			lister = me.pocket.detail3_rn()
			break;
		case 'sf':
			lister = me.pocket.detail3_sf()
			break;
		default:
			return;
			break;
		}
		lister.writer({enableLoadMask:true});
	},

	// < enrollment
	enrollment:function() {
		var me			= this,
			record		= [], seqn,
			detail3		= me.pocket.detail3(),
			detail4		= me.pocket.detail4(),
			store1		= detail3.getStore(),
			store2		= detail4.getStore(),
			selects		= detail4.getSelectionModel().getSelection();
			search		= me.pocket.workersearch(),
			val			= search.getForm().getValues()
		;
		if (!selects || selects.length <= 0) {
			Ext.Msg.alert("알림", "계획할 견적을 선택하여 주십시오.");
			return;
		};

		if(store1.data.items.length >0){
			seqn = store1.data.items.length + 1;
		}else{
			seqn = 1;
		}

		if(val.invc_numb == ''){
			Ext.Msg.alert("알림", "계획번호를 입력하여 주십시오.");
			return;
		}else if(val.invc_date == ''){
			Ext.Msg.alert("알림", "계획일자를 선택하여 주십시오.");
			return;
		}
//		else if(val.lott_numb == ''){
//			Ext.Msg.alert("알림", "Lot번호를 입력하여 주십시오.");
//			return;
//		}

		for( i = 0; i<selects.length; i++){
			record.push({
				_set			: 'insert',
				invc_numb		: val.invc_numb,
				invc_date		: val.invc_date,
				plan_date		: val.invc_date,
				lott_numb		: val.lott_numb,
				line_seqn		: seqn++,
				acpt_numb		: selects[i].get('invc_numb'),
				acpt_amnd_degr	: selects[i].get('amnd_degr'),
				acpt_seqn		: selects[i].get('line_seqn'),
				acpt_qntt		: selects[i].get('invc_qntt'),
				ispl_name		: selects[i].get('ispl_name'),
				wdbf_itid		: selects[i].get('wdbf_itid'),
				wdsf_itid		: selects[i].get('wdsf_itid'),
				line_stat		: '0',
				modify			: 'Y'
			});
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/set/plan.do',
			params	: {
				token : _global.token_id,
				param : Ext.encode({
					stor_id		: _global.stor_id,
					records		: record
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
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				store2.reload();
			}
		});

		store1.add(selects);
		store2.remove(selects);

	},

	// > remove
	remove : function() {
		var me = this,
			detail3		= me.pocket.detail3(),
			detail4		= me.pocket.detail4(),
			store1		= detail3.getStore(),
			store2		= detail4.getStore(),
			selects		= detail3.getSelectionModel().getSelection(),
			record		= []
		;

		for( i = 0; i<selects.length; i++){
			record.push({
				_set			: 'delete',
				invc_numb		: val.invc_numb,
				acpt_numb		: selects[i].get('invc_numb'),
				acpt_seqn		: selects[i].get('line_seqn'),
				modify			: 'Y'
			});
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/set/plan.do',
			params	: {
				token : _global.token_id,
				param : Ext.encode({
					stor_id		: _global.stor_id,
					records		: record
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
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		store1.remove (selects);
		store2.add(selects);
		store2.sort('invc_numb', 'ASC');
		store2.sort('line_seqn', 'ASC');

	},

});
