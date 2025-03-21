Ext.define('module.custom.komec.eis.eisreport.view.EisReportLister2', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-komec-eisreport-lister2',
	initComponent : function() {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem : function() {
		var me = this,
			item = {
				layout	: 'vbox',
				flex	: 1,
				border	: 0,
				padding : '10',
				items	: [
				    {	layout	: 'hbox',
				    	flex	: 1,
				    	border	: 0,
				    	items	: [
				    	    {	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic1',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    },{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic2',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    },{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic3',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    },{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic4',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    },{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic5',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    }
				    	]
				    },{	layout	: 'hbox',
				    	flex	: 1,
				    	border	: 0,
				    	items	: [
							{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic6',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    },{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic7',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    },{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic8',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    },{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic9',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    },{	layout : 'vbox',
				    	    	border	: 0,
				    	    	margin	: 20,
				    	    	items	: [
									{	xtype	: 'form',
										border	: 0,
										items	: [
											{	xtype	: 'textfield',
												name	: 'cvic10',
												value	: '',
												fieldStyle	: 'font-size:3em !important;text-align: center;',
												width	: 300,
												height	: 50,
												readOnly: true
											}
										]
									},{	xtype	: 'container',
										border	: 0,
										items	: [
											{	xtype	: 'component',
												autoEl: {
											        tag: 'strong'
											    },
											    style : 'position: absolute;top: 50px;left: 0; width: 100%;text-align: center;line-height: 43px;font-size: 30px;'
											}
										]
									}
				    	    	]
				    	    }
				    	]
				    }
				],
			}
		return item;
	},
	drawChart:function(id,data){

		var progress = 0;
		var html = '';
		if(data){
			if(data.indn_qntt != 0){
				progress = (data.prod_qntt/data.indn_qntt);
			}
			html = '<span style="font-size:2em !important;">'
				+Math.round(100 * progress)
				+'<i>%</i></span>'
				+'<br> '+data.prog_stat_name
				+'<br>지시 : '+data.indn_qntt
				+'<br>생산 : '+data.prod_qntt
				+'<br>불량 : '+data.poor_qntt
			;
		}
		$('#'+id).circleProgress({
			value:  progress,
			size : 300,
			file : {
				gradient:['red','orange']
			}
		})
		$('#'+id).find('strong').html(html);
	},
	changeProgress : function(id,data){
		var progress = (data.prod_qntt/data.indn_qntt);

		var html = '<span style="font-size:2em !important;">'
			+Math.round(100 * progress)
			+'<i>%</i></span>'
			+'<br> '+data.prog_stat_dvcd_name
			+'<br>지시 : '+data.indn_qntt
			+'<br>생산 : '+data.prod_qntt
			+'<br>불량 : '+data.poor_qntt
		;
		$('#'+id).find('strong').html(html);
		$('#'+item.id+"-innerCt").circleProgress('value',progress);
	}
});
