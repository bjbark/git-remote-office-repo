Ext.define('module.eis.project.eisreport.EisReport', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup'
	],

	models	: [
		'module.eis.project.eisreport.model.EisReportMaster',
		'module.eis.project.eisreport.model.EisReportDetail',
		'module.eis.project.eisreport.model.EisReportDetail2',
		'module.eis.project.eisreport.model.EisReportDetail3',
		//실시간 설비현황
		'module.eis.project.eisreport.model.EisReportChart1',
		'module.eis.project.eisreport.model.EisReportRunnStopTime',
		'module.eis.project.eisreport.model.EisReportRunningData',
		'module.eis.project.eisreport.model.EisReportChart2'
	],
	stores	: [
		'module.eis.project.eisreport.store.EisReportMaster',
		'module.eis.project.eisreport.store.EisReportDetail',
		'module.eis.project.eisreport.store.EisReportDetail2',
		'module.eis.project.eisreport.store.EisReportDetail3',
		//실시간 설비현황
		'module.eis.project.eisreport.store.EisReportChart1',
		'module.eis.project.eisreport.store.EisReportChart2',
		'module.eis.project.eisreport.store.EisReportRunningData',
		'module.eis.project.eisreport.store.EisReportRunnStopTime'
	],
	views	: [
		'module.eis.project.eisreport.view.EisReportLayout',
		'module.eis.project.eisreport.view.EisReportSearch',
		'module.eis.project.eisreport.view.EisReportListerMaster',
		'module.eis.project.eisreport.view.EisReportListerDetail',
		'module.eis.project.eisreport.view.EisReportListerDetail2',
		'module.eis.project.eisreport.view.EisReportListerDetail3',
		'module.eis.project.eisreport.view.EisReportListerDetail4',
		'module.eis.project.eisreport.view.EisReportListerDetail5',
		'module.eis.project.eisreport.view.EisReportListerDetail6',
		'module.eis.project.eisreport.view.EisReportListerDetail7',
		'module.eis.project.eisreport.view.EisReportEditor',

		//실시간 설비현황
		'module.eis.project.eisreport.view.EisReportChart1',
		'module.eis.project.eisreport.view.EisReportChart2',
		'module.eis.project.eisreport.view.EisReportRunningData',
		'module.eis.project.eisreport.view.EisReportRunnStopTime',
		'module.eis.project.eisreport.view.EisReportChartSearch'

	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-eisreport-lister-master' : {
				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
			},
			'module-eisreport-lister-detail' : {
				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
			},
			'module-eisreport-lister-detail2' : {
				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
			},
			'module-eisreport-lister-detail3' : {
				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
			},
			'module-eisreport-layout #mainpanel'							: { tabchange : me.selectAction  }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function  () { return Ext.ComponentQuery.query('module-eisreport-layout')[0] },
		search			: function  () { return Ext.ComponentQuery.query('module-eisreport-search')[0] },
		listermaster	: function  () { return Ext.ComponentQuery.query('module-eisreport-lister-master')[0] },
		listerdetail	: function  () { return Ext.ComponentQuery.query('module-eisreport-lister-detail')[0] },
		listerdetail4	: function  () { return Ext.ComponentQuery.query('module-eisreport-lister-detail4')[0] },
		listerdetail2	: function  () { return Ext.ComponentQuery.query('module-eisreport-lister-detail2')[0] },
		listerdetail3	: function  () { return Ext.ComponentQuery.query('module-eisreport-lister-detail3')[0] },
		listerdetail6	: function  () { return Ext.ComponentQuery.query('module-eisreport-lister-detail6')[0] },
		editor			: function  () { return Ext.ComponentQuery.query('module-eisreport-editor')[0] },
		popup			: function  () { return Ext.ComponentQuery.query('module-eisreport-order-popup')[0] }
	},
	//선택
	selectRecord : function(a,b){
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0
			btab = Ext.getCmp("toggleonoff"),
			stab = Ext.dom.Query.select('.toggleon')[0],
			pjod_idcd = b.data.pjod_idcd,
			item_name = b.data.item_name,
			deli_date = b.data.deli_date,
			listerdetail = me.pocket.listerdetail(),
			work_ordr_dvcd = ''
		;
		if(b.stores[0].storeId.indexOf('Master') != -1){
			work_ordr_dvcd = '1100';
		}else if(b.stores[0].storeId.indexOf('Detail') != -1){
			work_ordr_dvcd = b.data.work_ordr_dvcd;
		}
		if(window.stop==0){
			btab.fireEvent('toggle');
			btab.toggle(true,true);
		}
		var chk = Ext.dom.Query.select('.x-css-shadow');
			api_host = _global.api_host_info,
			hq_id = _global.hq_id.toUpperCase();
			token = _global.token_id,
//			ordr_degr = b.data.ordr_degr,
			search_url	= '/system/eis/project/eisreport/get/getGanttChart.do',
			search_url2	= '/system/eis/project/eisreport/get/getGanttGrid.do',
//			search_url	= '/system/eis/project/eisreport/get/getTest.do',
			url='/system/ganttchart/getSeriesGantt.do?param={api_host:\''+api_host+'\',search_url:\''+search_url+'\',pjod_idcd:\''+pjod_idcd+'\',token:\''+token+'\',hq_id:\''+hq_id+'\',work_ordr_dvcd:\''+work_ordr_dvcd+'\',item_name:\''+item_name+'\',deli_date:\''+deli_date+'\'}',
			url2='/system/ganttchart/grid.do?param={api_host:\''+api_host+'\',search_url:\''+search_url2+'\',work_ordr_dvcd:\''+work_ordr_dvcd+'\',token:\''+token+'\',hq_id:\''+hq_id+'\'}'
		;

		if(chk.length ==0||chk[0].style.display=="none"){
			var win = Ext.create("Ext.window.Window",
				{	title : '진행현황',
					height:700,
					width:1500,
					maximizable : true,
					id : 'gantt_window',
	//				minimizable : true,
					html:'<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="80%" height="100%">iframe</iframe>'+
					'<iframe src="'+_global.api_host_info+encodeURI(url2)+'" width="20%" height="100%" id="iframe2">iframe</iframe>',
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
	},
	//조회
	selectAction:function() {
		var me = this,
			listermaster	= me.pocket.listermaster(),
			listerdetail	= me.pocket.listerdetail(),
			listerdetail2	= me.pocket.listerdetail2(),
			listerdetail3	= me.pocket.listerdetail3(),
			listerdetail6	= me.pocket.listerdetail6(),
			search			= me.pocket.search(),
			param			= search.getValues(),
			tpanel			= me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister1			= undefined,
			lister2			= undefined,
			ordr_dvcd  = undefined
		;
		console.log(tindex);
		if(tindex == 1){
			if(search.down('[name=wkct_name]').rawValue){
				document.getElementById('label1').innerHTML =  search.down('[name=wkct_name]').rawValue+' 대기 부품';
				document.getElementById('label2').innerHTML =  search.down('[name=wkct_name]').rawValue+' 진행 부품';
			}
		}else if(tindex == 4){
			var me		= this,
				chart1	= Ext.getStore('module.eis.project.eisreport.store.EisReportChart1'),
				chart2	= Ext.getStore('module.eis.project.eisreport.store.EisReportChart2'),
				runndata	= Ext.getStore('module.eis.project.eisreport.store.EisReportRunningData'),
				runnstop	= Ext.getStore('module.eis.project.eisreport.store.EisReportRunnStopTime'),
				run = Ext.ComponentQuery.query('module-eisreport-runnstop')[0]
			;
			var today = Ext.Date.format(new Date(),'Ymd');
			chart1.load({
				params : {
					param:JSON.stringify({invc_date : today})
				},
				callback : function(records,operation,success){
				}
			});
			chart2.load({
				params : {
					param:JSON.stringify({invc_date : today})
				},
				callback : function(records,operation,success){
				}
			});
			runndata.load({
				params : {
					param:JSON.stringify({invc_date : today})
				},
				callback : function(records,operation,success){
				}
			});
			runnstop.load({
				params : {
					param:JSON.stringify({invc_date : today})
				},
				callback : function(records,operation,success){
					console.log(records[0]);

					run.loadRecord(records[0]);
				}
			});
			clearInterval(window.time);
			window.time= null
			window.time = setInterval(function(){
				runndata.reload();
				runnstop.reload();
				chart1.load({
					params : {
						param:JSON.stringify({invc_date : today})
					},
					callback : function(records,operation,success){
					}
				})
				chart2.load({
					params : {
						param:JSON.stringify({invc_date : today})
					},
					callback : function(records,operation,success){
					}
				})
			}, 60000);
		}
		if(window.stop == 0){
			var chk = 0;
			if(tindex == 0){
				lister1 = listermaster;
				lister2 = listerdetail;
				ordr_dvcd = listerdetail.down('[name=ordr_dvcd]').getValue();
			}else if(tindex == 1){
				lister1 =  listerdetail2;
				lister2 =  listerdetail3;
				if(param.wkct_idcd==''||param.wkct_idcd==null){
					chk = 1;
				}
			}else if(tindex == 2){
				document.getElementById('iframe').contentDocument.location.reload(true);
			}else if(tindex ==3){
				document.getElementById('iframe2').contentDocument.location.reload(true);
			}

			if(chk==1){
				if(tindex != 2){
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
					mask.show();
					lister1.select({
						callback:function(records, operation, success) {
							if (success) {
							} else {
							}
						}, scope:me
					}, Ext.merge( param, {stor_id : _global.stor_id}) );

					lister2.select({
						callback:function(records, operation, success) {
							if (success) {
							} else {
							}
							mask.hide();
						}, scope:me
					}, Ext.merge( param, {stor_id : _global.stor_id,work_ordr_dvcd:ordr_dvcd}) );
				}
			}
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});