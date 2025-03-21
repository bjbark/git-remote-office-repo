Ext.define('module.custom.komec.eis.eisreport.EisReport', { extend : 'Axt.app.Controller',
	requires: [
		 'module.common.view.SearchBar'
		,'module.common.view.SearchRowStatus'
		,'Axt.popup.view.ZipcodeSearch'
		,'Axt.popup.view.FileUpload'
		,'lookup.popup.view.CvicPopup'
	],
	models:[
		'module.custom.komec.eis.eisreport.model.EisReport',
		'module.custom.komec.eis.eisreport.model.EisReportGraph',
	],
	stores:
	[
	 	'module.custom.komec.eis.eisreport.store.EisReport',
	 	'module.custom.komec.eis.eisreport.store.EisReportGraph',
	],
	views:[
		'module.custom.komec.eis.eisreport.view.EisReportSearch',
		'module.custom.komec.eis.eisreport.view.EisReportLayout',
		'module.custom.komec.eis.eisreport.view.EisReportLister',
		'module.custom.komec.eis.eisreport.view.EisReportLister2',
		'module.custom.komec.eis.eisreport.view.EisReportLister3',
		'module.custom.komec.eis.eisreport.view.EisReportLister4',
		'module.custom.komec.eis.eisreport.view.EisReportEditor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.mainTabChange();
	},

	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({
			'module-komec-eisreport-search betweenfield' : { change: me.mainTabChange  },
			'module-komec-eisreport-search textfield[name=cvic_idcd]' : { change: me.mainTabChange  },
			'module-komec-eisreport-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},

			'module-komec-eisreport-lister3 button[action=exportAction]': { click : me.exportAction       }, /* 엑셀 */
		});

		me.callParent(arguments);
	},

	/**
	 *
	 */
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-komec-eisreport-search')[0] },
		layout  : function () { return Ext.ComponentQuery.query('module-komec-eisreport-layout')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-komec-eisreport-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-komec-eisreport-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-komec-eisreport-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-komec-eisreport-lister3')[0] },
		lister4 : function () { return Ext.ComponentQuery.query('module-komec-eisreport-lister4')[0] },
	},

	mainTabChange:function() {
		var	me			= this,
			tpanel		= me.pocket.layout().down('#mainpanel'),
			tindex 		= tpanel.items.indexOf(tpanel.getActiveTab()),
			search		= me.pocket.search(),
			values		= search.getValues(),
			lister 		= me.pocket.lister(),
			lister2 	= me.pocket.lister2(),
			lister3 	= me.pocket.lister3()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		switch (tindex) {
			case 0:
				mask.show();

				lister.select({
					callback:function(records, operation, success) {
						if (success && records.length > 0) {
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge( values,{ hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
				break;
			case 1:

				var items = lister2.query('[xtype=container]');
	            var i = 0;
	            var rec = [];
	            Ext.Ajax.request({
	    			url		: _global.location.http() + '/custom/komec/eis/eisreport/get/progress.do',
	    			params	: {
	    				token : _global.token_id,
	    				param : JSON.stringify(values)
	    			},
	    			async	: false,
	    			method	: 'POST',
	    			success	: function(response, request) {
	    				var result = Ext.decode(response.responseText);
	    				if	(!result.success ){
	    					Ext.Msg.error(result.message );
	    					return;
	    				} else {
	    					rec= result.records;
	    				}
	    			},
	    			failure : function(result, request) {
	    				Ext.Msg.error(result.mesage);
	    			},
	    			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
	    			}
	    		});
	            setTimeout(function(){
	            	var id = "";
	            	Ext.each(items,function(item){
	            		lister2.drawChart(item.id+"-innerCt",rec[i]);
	        			if(rec[i] != undefined){
	        				lister2.down('[name=cvic'+(i+1)+']').setValue(rec[i].cvic_name);
	        			}else{
	        				lister2.down('[name=cvic'+(i+1)+']').setValue('');
	        			}
	        			i++;
		            })
		            setTimeout(function(){
		            	lister2.doLayout();
		            },100)
	            },100)

				break;
			case 2:
				if(values.cvic_idcd != ""){
					lister3.select({
						callback:function(records, operation, success) {
							if (success && records.length > 0) {
								var lastRecord = records[records.length - 1];

								if(lastRecord.raw['wkct_name'] != '' && lastRecord.raw['wkct_name'] != null){
									if(lastRecord.raw['temp_appr'] > Math.abs(lastRecord.raw['temp_valu']-lastRecord.data['temperature'])){
										Ext.Msg.alert("알림", "온도를 확인해주세요.");
									}else if(lastRecord.raw['rpm_appr'] > Math.abs(lastRecord.raw['rpm_valu']-lastRecord.data['rpm'])){
										Ext.Msg.alert("알림", "RPM을 확인해주세요.");
									}else{

									}
								}
							} else {
							}
						}, scope:me
					}, Ext.merge( values,{ hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
				}else{
					lister3.getStore().clearData();
					lister3.getStore().loadData([],false);

				}
				break;

			default:
				break;
		}
		clearInterval(window.mainTabInterval);
		window.mainTabInterval = setInterval(function(){
			me.mainTabChange();
		}, 60000);
	},

	checkDataAndShowAlerts:function(data){
		var me = this;
		if( data && data.length > 0){
			var lastRecord = data[data.length - 1];
			if(lastRecord.raw['wkct_name'] != '' && lastRecord.raw['wkct_name'].isNotEmpty && lastRecord.raw['wkct_name'] != null){
				if(lastRecord.raw['temp_valu'] > 50){
					console.log('2차');
					Ext.Msg.alert("알림", "온도를 확인해주세요.");
				}
			}
		}
	},

	exportAction : function(self) {
		this.pocket.lister3().writer({enableLoadMask:true});
	},

});

