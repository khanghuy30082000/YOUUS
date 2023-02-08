import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useHistory } from 'react-router-native';
import { PageHeadersIb } from '../AppComponents/PageHeadersIb';
import { Tab } from './Tab';
import SearchChatItemCaNhan from '../AppComponents/SearchChatItemCaNhan';
import { Footer } from '../Wall/Footer';
import { StatusBar } from 'expo-status-bar';
import CustomIbCaNhan from '../../components/AppComponents/CustomIbCaNhan'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import { doc, Firestore } from 'firebase/firestore';
import { useEffect } from 'react';

const TabCaNhan = () => {
    
    
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'red'
        }}>
            {/* <StatusBar style='dark' /> */}
            <PageHeadersIb />
            <Tab />
            <SearchChatItemCaNhan />
            <ScrollView style={{ flex: 0.8}}>
                {/* <CustomIbCaNhan/> */}
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}
export default TabCaNhan

const styles = StyleSheet.create({})