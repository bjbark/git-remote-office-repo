/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.grid.feature.Feature
 * @extends Ext.util.Observable
 * 
 * A feature is a type of plugin that is specific to the {@link Ext.grid.Panel}. It provides several
 * hooks that allows the developer to inject additional functionality at certain points throughout the 
 * grid creation cycle. This class provides the base template methods that are available to the developer,
 * it should be extended.
 * 
 * There are several built in features that extend this class, for example:
 *
 *  - {@link Ext.grid.feature.Grouping} - Shows grid rows in groups as specified by the {@link Ext.data.Store}
 *  - {@link Ext.grid.feature.RowBody} - Adds a body section for each grid row that can contain markup.
 *  - {@link Ext.grid.feature.Summary} - Adds a summary row at the bottom of the grid with aggregate totals for a column.
 * 
 * ## Using Features
 * A feature is added to the grid by specifying it an array of features in the configuration:
 * 
 *     var groupingFeature = Ext.create('Ext.grid.feature.Grouping');
 *     Ext.create('Ext.grid.Panel', {
 *         // other options
 *         features: [groupingFeature]
 *     });
 * 
 * @abstract
 */
Ext.define('Axt.grid.feature.Feature', {
    extend: 'Ext.util.Observable',
    alias: 'feature.feature',
    
    isFeature: true,
    disabled: false,
    
    /**
     * @property {Boolean}
     * Most features will expose additional events, some may not and will
     * need to change this to false.
     */
    hasFeatureEvent: true,
    
    /**
     * @property {String}
     * Prefix to use when firing events on the view.
     * For example a prefix of group would expose "groupclick", "groupcontextmenu", "groupdblclick".
     */
    eventPrefix: null,
    
    /**
     * @property {String}
     * Selector used to determine when to fire the event with the eventPrefix.
     */
    eventSelector: null,
    
    /**
     * @property {Ext.view.Table}
     * Reference to the TableView.
     */
    view: null,
    
    /**
     * @property {Ext.grid.Panel}
     * Reference to the grid panel
     */
    grid: null,
    
    /**
     * Most features will not modify the data returned to the view.
     * This is limited to one feature that manipulates the data per grid view.
     */
    collectData: false,
        
    getFeatureTpl: function() {
        return '';
    },
    
    /**
     * Abstract method to be overriden when a feature should add additional
     * arguments to its event signature. By default the event will fire:
     * - view - The underlying Ext.view.Table
     * - featureTarget - The matched element by the defined {@link #eventSelector}
     *
     * The method must also return the eventName as the first index of the array
     * to be passed to fireEvent.
     * @template
     */
    getFireEventArgs: function(eventName, view, featureTarget, e) {
        return [eventName, view, featureTarget, e];
    },
    
    /**
     * Approriate place to attach events to the view, selectionmodel, headerCt, etc
     * @template
     */
    attachEvents: function() {
        
    },
    
    getFragmentTpl: function() {
        return;
    },
    
    /**
     * Allows a feature to mutate the metaRowTpl.
     * The array received as a single argument can be manipulated to add things
     * on the end/begining of a particular row.
     * @template
     */
    mutateMetaRowTpl: function(metaRowTplArray) {
        
    },
    
    /**
     * Allows a feature to inject member methods into the metaRowTpl. This is
     * important for embedding functionality which will become part of the proper
     * row tpl.
     * @template
     */
    getMetaRowTplFragments: function() {
        return {};
    },

    getTableFragments: function() {
        return {};
    },
    
    /**
     * Provide additional data to the prepareData call within the grid view.
     * @param {Object} data The data for this particular record.
     * @param {Number} idx The row index for this record.
     * @param {Ext.data.Model} record The record instance
     * @param {Object} orig The original result from the prepareData call to massage.
     * @template
     */
    getAdditionalData: function(data, idx, record, orig) {
        return {};
    },
    
    /**
     * Enable a feature
     */
    enable: function() {
        this.disabled = false;
    },
    
    /**
     * Disable a feature
     */
    disable: function() {
        this.disabled = true;
    }
    
});
