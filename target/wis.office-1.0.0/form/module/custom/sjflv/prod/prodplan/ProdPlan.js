Ext.define( 'module.custom.sjflv.prod.prodplan.ProdPlan', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupSjung',
		'lookup.upload.FileUpload'
	],
	models: [
		'module.custom.sjflv.prod.prodplan.model.ProdPlanLister1',
		'module.custom.sjflv.prod.prodplan.model.ProdPlanLister2',
		'module.custom.sjflv.prod.prodplan.model.ProdPlanItem1',
	],
	stores: [
		'module.custom.sjflv.prod.prodplan.store.ProdPlanLister1',
		'module.custom.sjflv.prod.prodplan.store.ProdPlanLister2',
		'module.custom.sjflv.prod.prodplan.store.ProdPlanItem1',
	],
	views : [
		'module.custom.sjflv.prod.prodplan.view.ProdPlanLayout',
		'module.custom.sjflv.prod.prodplan.view.ProdPlanLister1',
		'module.custom.sjflv.prod.prodplan.view.ProdPlanLister2',
		'module.custom.sjflv.prod.prodplan.view.ProdPlanItem1',
		'module.custom.sjflv.prod.prodplan.view.ProdPlanSearch',
		'module.custom.sjflv.prod.prodplan.view.StokAsgnPopup',
		'module.custom.sjflv.prod.prodplan.view.AddProdPopup',
		'module.custom.sjflv.prod.prodplan.view.ProdPlanPopup',
		'module.custom.sjflv.prod.prodplan.view.ProdPlanPopup2',
		'module.custom.sjflv.prod.prodplan.view.HtmlPopup',
		'module.custom.sjflv.prod.prodplan.view.ProdPlanNdqtPopup',
		'module.custom.sjflv.prod.prodplan.view.PlanDatePopup',
	],
	
	initPermission: function(workspace, permission) {

	},
	
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sjflv-prodplan-search button[action=selectAction]'			: { click: me.selectAction	},  /* 조회 */
			'module-sjflv-prodplan-search [name=group_apply]'					: { change: me.groupApply	},
			'module-sjflv-prodplan-lister1 button[action=exportAction]'			: { click: me.exportAction	},
			'module-sjflv-prodplan-lister2 button[action=exportAction]'			: { click: me.exportAction2	},
			'module-sjflv-prodplan-lister1'										: { itemclick: me.selectAction2	},  /* 원재료재고현황 조회 */
			'module-sjflv-prodplan-lister1 button[action=showStockAsgnPopup]'	: { click: me.showStockAsgnPopup},
			'module-sjflv-prodplan-lister1 button[action=showHtmlPage]'			: { click: me.showHtmlPage		},
			'module-sjflv-prodplan-lister1 button[action=showFileUpload]'		: { click: me.showFileUpload	},
			'module-sjflv-prodplan-lister1 button[action=showPlanNdqtPopup]'	: { click: me.showPlanNdqtPopup	},
			'module-sjflv-prodplan-lister2 button[action=deleteAction]'			: { click: me.deletePlan		},
			'module-sjflv-prodplan-lister2 button[action=updateAction]'			: { click: me.updatePlanDate	},  /* 계획일자 변경 */
			'module-sjflv-prodplan-layout [itemId=mainpanel]'					: { tabchange: me.tabChange		}
		});
		me.callParent(arguments);
	},
	
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-sjflv-prodplan-layout '		)[0] } ,
		search	: function () { return Ext.ComponentQuery.query('module-sjflv-prodplan-search '		)[0] } ,
		// 생산계획수립
		grid1	: function () { return Ext.ComponentQuery.query('module-sjflv-prodplan-lister1'		)[0] } ,
		// 원재료재고현황
		grid2	: function () { return Ext.ComponentQuery.query('module-sjflv-prodplan-lister-item1')[0] } ,
		// 생산계획현황
		grid3	: function () { return Ext.ComponentQuery.query('module-sjflv-prodplan-lister2'		)[0] } ,
	},
	
	updatePlanDate: function() {
		var me = this;
		var store = me.pocket.grid3().getStore();
		var selection = me.pocket.grid3().getSelectionModel().getSelection();
		var isEmpty = true;
		
		Ext.Array.each(selection, function(rec) {
			if (rec.get('plan_date') != undefined) {
				isEmpty = false;
				return false
			}
		});
		
		var popup = resource.loadPopup({
			widget	: 'module-sjflv-plandate-popup',
			owner	: me.pocket.grid3()
		});
	},
	
	showPlanNdqtPopup: function() {
		var me = this;
		var params = [];
		var grid1 = me.pocket.grid1();
		var selection = grid1.getSelectionModel().getSelection();
		
		var popup = resource.loadPopup({
			widget	: 'module-sjflv-prodplanndqt-popup',
			owner	: grid1
		});
		
		Ext.Array.each(selection, function(rec) {
			params.push({
				item_idcd : rec.get('item_idcd'),
				revs_numb : rec.get('revs_numb'),
				mixx_qntt : rec.get('plan_baln_qntt'),
				loss_rate : rec.get('incm_loss_rate')
			})
		})
		
		popup.down('grid').select({
			callback:function(records, operation, success) {
				if (success) {
					Ext.Array.each(records, function(rec){
						var needQntt = rec.get('plan_qntt');
						var stokQntt = rec.get('stok_qntt');
						if (stokQntt < needQntt) {
							rec.set('baln_qntt', needQntt - stokQntt);
						} else {
							rec.set('baln_qntt', 0);
						}
					})
				}
			}, scope:me
		}, Ext.merge( {records:params}) );
	},
	
	showFileUpload: function() {
		resource.loadPopup({
			widget : 'lookup-file-upload',
			apiurl : {
				upload : _global.location.href + '/system/custom/sjflv/prod/prodplan/set/html/template.do',
			},
			option : {
				extension : ['html'],
			},
			params : {},
			result : function(records) {
				Ext.Msg.alert( '', '업로드 성공 했습니다.' );
 			}
		});
	},
	
	showHtmlPage: function() {
		resource.loadPopup({
			widget	: 'module-sjflv-html-popup',
		});
	},
	
	selectAction: function() {
		var me = this,
		layout = me.pocket.layout(),
		search = me.pocket.search(),
		param = search.getValues(),
		grid1 = me.pocket.grid1(),
		grid3 = me.pocket.grid3(),
		activeTab = layout.down('tab-panel').getActiveTab().name;
			
		if (activeTab === "firstTab") {
			grid1.select({
				callback: function(records, operation, success) {
					if (success) {
						
					} else {
						
					}
				},
				scope: me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		} else {
			grid3.select({
				callback: function(records, operation, success) {
					if (success) {
						
					} else {
						
					}
				},
				scope: me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},
	
	// 원재료 재고현황 조회
	selectAction2: function(self, rec) {
		var me = this,
		selection = rec,
		grid2 = me.pocket.grid2();
		
		grid2.down('[name=plan_baln_qntt]').setValue(rec.get('plan_baln_qntt'));
		grid2.down('[name=incm_loss_rate]').setValue(rec.get('incm_loss_rate'));
		grid2.select({
			callback: function(records, operation, success) {
				var maxProdQntt = undefined;
				Ext.Array.each(records, function(rec){
					var needQntt = (selection.get('invc_qntt') / (100 - selection.get('incm_loss_rate')) * 100) * (rec.get('mixx_rate')/100);
					var stokQntt = rec.get('stok_qntt');
					var mtrl_usage_unit = (1 / (100 - selection.get('incm_loss_rate')) * 100) * (rec.get('mixx_rate')/100);
					var maxQntt = Math.floor(rec.get('stok_qntt') / mtrl_usage_unit);
					if (maxProdQntt > maxQntt || maxProdQntt === undefined) {
						maxProdQntt = maxQntt;
					}
					rec.set('need_qntt', needQntt);
					if (stokQntt < needQntt) {
						rec.set('baln_qntt', needQntt - stokQntt);
					} else {
						rec.set('baln_qntt', 0);
					}
					grid2.down('[name=max_prod_qntt]').setValue(maxProdQntt);
				})
			},
			scope: me
		}, {stor_id: _global.stor_id, item_idcd: selection.get('item_idcd')})
	},
	
	deletePlan: function(){
		var me = this,
		grid = me.pocket.grid3(),
		store = grid.getStore(),
		selection = grid.getSelectionModel().getSelection(),
		data = [];
		
		if (selection.length === 0) {
			Ext.Msg.alert('알림', '삭제할 생산계획 항목을 선택해주세요.');
			return false;
		}
		
		selection = Ext.Array.filter(selection, function(rec) {
			var invcNumb = rec.get('invc_numb');
			
			if (data[invcNumb] === undefined) {
				data[invcNumb] = true;
				return true;
			} else {
				return false;
			}
		})
		
		Ext.Msg.confirm("확인", "선택하신 생산 계획들을 모두 삭제하시겠습니까?", function(btn) {
			if (btn == 'yes') {
				store.remove(selection);
				store.sync({
					success : function(records, operation){
						store.reload();
						Ext.Msg.alert('알림', '생산계획 삭제 완료.');
					},
					finished : function(results, record, operation){
						
					}
				})
			}
		});
	},
	
	showStockAsgnPopup: function() {
		var me = this,
		grid = me.pocket.grid1(),
		selection = grid.getSelectionModel().getSelection();
		
		if (selection.length > 1) {
			Ext.Msg.alert('알림', '재고 할당은 한 번에 하나의 항목에만 가능합니다.');
			return false;
		} else if (selection.length < 1) {
			Ext.Msg.alert('알림', '재고 할당을 위해 항목을 선택해 주세요.');
			return false;
		}
		
		popup = resource.loadPopup({
			widget	: 'module-sjflv-stokasgn-popup',
			params	: selection[0],
			caller	: me
		});
	},
	
	groupApply: function(self, newVal, oldVal) {
		var viewFeature = this.pocket.grid1().view.getFeature('itemCodeGrouping');
		
		if (newVal === true) {
			viewFeature.enable();
		} else {
			viewFeature.disable();
		}
	},
	
	tabChange: function( tabPanel, newCard, oldCard, eOpts ) {
		var searchForm = this.pocket.search();
		
		if (newCard.name === 'secondTab') {
			searchForm.down('[name=group_apply]').hide();
			searchForm.down('[name=prod_date1]').show();
			searchForm.down('[name=prod_date2]').show();
		} else {
			searchForm.down('[name=group_apply]').show();
			searchForm.down('[name=prod_date1]').hide();
			searchForm.down('[name=prod_date2]').hide();
		}
	},
	
	exportAction: function(){
		this.pocket.grid1().writer({enableLoadMask:true});
	},
	
	exportAction2: function() {
		this.pocket.grid3().writer({enableLoadMask:true});
	}
});
