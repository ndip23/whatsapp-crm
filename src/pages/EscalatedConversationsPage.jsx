import { useState, useMemo } from 'react'
import { Search, AlertCircle, User, Calendar, MessageCircle } from 'lucide-react'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const EscalatedConversationsPage = () => {
  // Sample data for escalated conversations with messages
  const [conversations] = useState([
    { 
      id: 1, 
      client: 'Michael Thompson', 
      agent: 'Jane Smith', 
      date: '2023-06-01', 
      messages: 22, 
      escalationTime: '1 hour 15 mins',
      reason: 'Technical issue unresolved',
      priority: 'High',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hello, I\'ve been trying to upload my documents for the past hour but keep getting an error.', timestamp: '09:30 AM' },
        { id: 2, sender: 'agent', content: 'Hi Michael, I\'m sorry to hear you\'re having trouble with document uploads. Can you tell me what error message you\'re seeing?', timestamp: '09:32 AM' },
        { id: 3, sender: 'client', content: 'It says "Upload failed: File size exceeds limit" but I\'ve uploaded larger files before.', timestamp: '09:33 AM' },
        { id: 4, sender: 'agent', content: 'Let me check your account settings. It looks like there was a recent update to our file size limits. I\'ll need to escalate this to our technical team.', timestamp: '09:35 AM' },
        { id: 5, sender: 'client', content: 'Thank you. This is urgent as I need these documents for my application.', timestamp: '09:36 AM' },
        { id: 6, sender: 'agent', content: 'I understand the urgency. I\'m escalating this issue now. Our technical team will contact you within the next 30 minutes.', timestamp: '09:37 AM' },
        { id: 7, sender: 'client', content: 'That would be great. I appreciate your help.', timestamp: '09:38 AM' },
        { id: 8, sender: 'agent', content: 'You\'re welcome. I\'ve created a high-priority ticket for you. Is there anything else I can assist with while we wait for the technical team?', timestamp: '09:39 AM' },
        { id: 9, sender: 'client', content: 'No, that\'s all for now. Thank you.', timestamp: '09:40 AM' },
        { id: 10, sender: 'agent', content: 'Perfect. I\'ll follow up with you once I hear back from the technical team.', timestamp: '09:41 AM' },
        { id: 11, sender: 'client', content: 'Sounds good.', timestamp: '09:42 AM' },
        { id: 12, sender: 'tech', content: 'This is John from the technical team. I\'ve identified the issue and it\'s related to a server configuration that\'s affecting certain file types.', timestamp: '10:15 AM' },
        { id: 13, sender: 'tech', content: 'I\'ve applied a fix to the server. Could you please try uploading your documents again?', timestamp: '10:16 AM' },
        { id: 14, sender: 'client', content: 'I\'m trying it now... Yes, it\'s working! Thank you so much!', timestamp: '10:18 AM' },
        { id: 15, sender: 'tech', content: 'Great to hear! I\'ve also increased the file size limit for your account as a temporary measure while we implement a permanent solution.', timestamp: '10:19 AM' },
        { id: 16, sender: 'client', content: 'That\'s very helpful. Thank you for the quick resolution.', timestamp: '10:20 AM' },
        { id: 17, sender: 'agent', content: 'Hi Michael, this is Jane following up on your escalated ticket. I\'m glad the technical team was able to resolve your issue quickly.', timestamp: '10:30 AM' },
        { id: 18, sender: 'client', content: 'Yes, everything is working perfectly now. Thank you all for your assistance.', timestamp: '10:31 AM' },
        { id: 19, sender: 'agent', content: 'You\'re very welcome. Is there anything else I can help you with today?', timestamp: '10:32 AM' },
        { id: 20, sender: 'client', content: 'No, that was the only issue. Thanks again!', timestamp: '10:33 AM' },
        { id: 21, sender: 'agent', content: 'Great! Have a wonderful day.', timestamp: '10:34 AM' },
        { id: 22, sender: 'client', content: 'You too!', timestamp: '10:35 AM' }
      ]
    },
    { 
      id: 2, 
      client: 'Jennifer Lopez', 
      agent: 'Bob Johnson', 
      date: '2023-06-01', 
      messages: 18, 
      escalationTime: '45 mins',
      reason: 'Billing dispute',
      priority: 'Medium',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hi, I noticed a charge on my account that I don\'t recognize.', timestamp: '11:15 AM' },
        { id: 2, sender: 'agent', content: 'Hello Jennifer, I\'d be happy to help you with that. Can you provide me with the date and amount of the charge in question?', timestamp: '11:17 AM' },
        { id: 3, sender: 'client', content: 'It\'s $49.99 from May 15th. I don\'t recall making any purchases on that date.', timestamp: '11:18 AM' },
        { id: 4, sender: 'agent', content: 'Let me look that up for you. I can see the charge was for our premium subscription renewal. Was this renewal unexpected?', timestamp: '11:20 AM' },
        { id: 5, sender: 'client', content: 'I thought I had canceled my subscription last month. This is definitely a billing error.', timestamp: '11:22 AM' },
        { id: 6, sender: 'agent', content: 'I apologize for the confusion. Let me check your account history to verify the cancellation.', timestamp: '11:23 AM' },
        { id: 7, sender: 'agent', content: 'I can see that your cancellation request was received, but there appears to be a processing error in our system. I\'ll need to escalate this to our billing department.', timestamp: '11:25 AM' },
        { id: 8, sender: 'client', content: 'Thank you. I\'d like to get this resolved as soon as possible.', timestamp: '11:26 AM' },
        { id: 9, sender: 'agent', content: 'Absolutely. I\'m escalating this issue now with high priority. Our billing team will contact you within 24 hours.', timestamp: '11:27 AM' },
        { id: 10, sender: 'client', content: 'That works. Please make sure they refund the charge as well.', timestamp: '11:28 AM' },
        { id: 11, sender: 'agent', content: 'Definitely. I\'ve noted that in the escalation ticket. They will process the refund once they resolve the cancellation issue.', timestamp: '11:29 AM' },
        { id: 12, sender: 'billing', content: 'This is Sarah from the billing department. I\'m looking into your subscription cancellation issue now.', timestamp: '12:00 PM' },
        { id: 13, sender: 'billing', content: 'I\'ve verified that your cancellation request was not properly processed due to a system error. I\'m canceling your subscription effective immediately.', timestamp: '12:02 PM' },
        { id: 14, sender: 'billing', content: 'I\'ve also issued a full refund of $49.99 to your original payment method. It should appear in your account within 3-5 business days.', timestamp: '12:03 PM' },
        { id: 15, sender: 'client', content: 'Thank you, Sarah. I appreciate the quick resolution.', timestamp: '12:04 PM' },
        { id: 16, sender: 'billing', content: 'You\'re very welcome, Jennifer. I apologize for the inconvenience this caused.', timestamp: '12:05 PM' },
        { id: 17, sender: 'agent', content: 'Hi Jennifer, this is Bob following up on your escalated ticket. I wanted to confirm that the billing department has resolved your issue.', timestamp: '12:15 PM' },
        { id: 18, sender: 'client', content: 'Yes, Sarah was very helpful. Thank you for escalating this.', timestamp: '12:16 PM' }
      ]
    },
    { 
      id: 3, 
      client: 'David Beckham', 
      agent: 'Alice Williams', 
      date: '2023-05-31', 
      messages: 25, 
      escalationTime: '2 hours 5 mins',
      reason: 'Service outage complaint',
      priority: 'High',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hello, your service has been down for the past 3 hours. This is严重影响my business operations.', timestamp: '08:30 AM' },
        { id: 2, sender: 'agent', content: 'Hi David, I\'m very sorry to hear you\'re experiencing service issues. Let me check our system status right away.', timestamp: '08:32 AM' },
        { id: 3, sender: 'agent', content: 'I can confirm we\'re currently experiencing a service outage affecting multiple users. Our engineering team is working on it with high priority.', timestamp: '08:33 AM' },
        { id: 4, sender: 'client', content: 'This is unacceptable. I\'m losing business while your service is down.', timestamp: '08:34 AM' },
        { id: 5, sender: 'agent', content: 'I completely understand your frustration, David. This is definitely not acceptable and I sincerely apologize for the impact on your business.', timestamp: '08:35 AM' },
        { id: 6, sender: 'agent', content: 'Given the severity of this issue and its impact on your business, I\'m escalating this to our senior engineering team with the highest priority.', timestamp: '08:36 AM' },
        { id: 7, sender: 'client', content: 'I appreciate that, but I need a timeline for resolution.', timestamp: '08:37 AM' },
        { id: 8, sender: 'agent', content: 'I understand. Our current ETA for partial service restoration is 2 hours, with full restoration expected within 4 hours.', timestamp: '08:38 AM' },
        { id: 9, sender: 'client', content: 'That\'s still too long. I need immediate assistance.', timestamp: '08:39 AM' },
        { id: 10, sender: 'agent', content: 'I\'m going to escalate this further to our executive team. Someone will contact you directly within the next 30 minutes.', timestamp: '08:40 AM' },
        { id: 11, sender: 'client', content: 'Thank you. I\'ll wait for their call.', timestamp: '08:41 AM' },
        { id: 12, sender: 'exec', content: 'This is Michael Chen, VP of Engineering. I\'m personally overseeing the resolution of this service outage.', timestamp: '09:00 AM' },
        { id: 13, sender: 'exec', content: 'We\'ve identified the root cause as a database corruption issue. We\'re implementing emergency procedures to restore service.', timestamp: '09:01 AM' },
        { id: 14, sender: 'exec', content: 'I expect partial service restoration within 45 minutes. I\'ll provide another update at that time.', timestamp: '09:02 AM' },
        { id: 15, sender: 'client', content: 'Thank you for the direct communication, Mr. Chen. I appreciate your personal involvement.', timestamp: '09:03 AM' },
        { id: 16, sender: 'exec', content: 'It\'s the least we can do given the impact on your business. We value you as a customer.', timestamp: '09:04 AM' },
        { id: 17, sender: 'eng', content: 'This is Lisa from the engineering team. We\'ve completed the database recovery process.', timestamp: '09:45 AM' },
        { id: 18, sender: 'eng', content: 'Partial service is now restored. You should be able to access most features, though performance may be slightly slower than usual.', timestamp: '09:46 AM' },
        { id: 19, sender: 'client', content: 'I can confirm that service is restored. Thank you for the quick resolution.', timestamp: '09:48 AM' },
        { id: 20, sender: 'eng', content: 'Great! We\'re continuing to monitor the system and will complete the full restoration shortly.', timestamp: '09:49 AM' },
        { id: 21, sender: 'exec', content: 'Hi David, this is Michael again. I wanted to personally confirm that service has been restored.', timestamp: '10:15 AM' },
        { id: 22, sender: 'exec', content: 'We\'ve also credited your account with a 10% service credit for the inconvenience.', timestamp: '10:16 AM' },
        { id: 23, sender: 'client', content: 'Thank you for that gesture, Mr. Chen. I appreciate how you handled this situation.', timestamp: '10:17 AM' },
        { id: 24, sender: 'exec', content: 'You\'re very welcome. We\'ve also implemented additional monitoring to prevent future outages.', timestamp: '10:18 AM' },
        { id: 25, sender: 'agent', content: 'Hi David, this is Alice following up on your escalated ticket. I\'m glad we were able to resolve this issue.', timestamp: '10:35 AM' }
      ]
    },
    { 
      id: 4, 
      client: 'Sarah Connor', 
      agent: 'John Doe', 
      date: '2023-05-31', 
      messages: 14, 
      escalationTime: '32 mins',
      reason: 'Account security concern',
      priority: 'High',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'I think my account has been compromised. I noticed unauthorized logins from different locations.', timestamp: '14:20 PM' },
        { id: 2, sender: 'agent', content: 'Hi Sarah, I\'m very concerned to hear about potential unauthorized access to your account. Let\'s secure it immediately.', timestamp: '14:22 PM' },
        { id: 3, sender: 'agent', content: 'First, I\'m going to lock your account to prevent any further unauthorized access. Then we\'ll reset your password and enable two-factor authentication.', timestamp: '14:23 PM' },
        { id: 4, sender: 'client', content: 'Thank you. I\'ve been trying to change my password but the system keeps rejecting my attempts.', timestamp: '14:24 PM' },
        { id: 5, sender: 'agent', content: 'That\'s because someone else may be logged in and actively preventing changes. I\'ve locked the account from our end.', timestamp: '14:25 PM' },
        { id: 6, sender: 'client', content: 'That\'s a relief. What should I do next?', timestamp: '14:26 PM' },
        { id: 7, sender: 'agent', content: 'I\'m going to escalate this to our security team. They\'ll conduct a full audit of your account and help you secure it.', timestamp: '14:27 PM' },
        { id: 8, sender: 'client', content: 'Please make this a high priority. My personal information is at risk.', timestamp: '14:28 PM' },
        { id: 9, sender: 'agent', content: 'Absolutely. I\'ve marked this as high priority and our security team lead will contact you within 15 minutes.', timestamp: '14:29 PM' },
        { id: 10, sender: 'security', content: 'This is Robert from the security team. I\'m conducting a full audit of your account now.', timestamp: '14:45 PM' },
        { id: 11, sender: 'security', content: 'I can confirm there were 3 unauthorized login attempts from IP addresses in different countries. I\'ve blocked those IPs and reset all session tokens.', timestamp: '14:47 PM' },
        { id: 12, sender: 'security', content: 'I\'m also recommending that you change all passwords associated with services that may use the same credentials.', timestamp: '14:48 PM' },
        { id: 13, sender: 'client', content: 'Thank you, Robert. I appreciate your thoroughness.', timestamp: '14:49 PM' },
        { id: 14, sender: 'agent', content: 'Hi Sarah, this is John following up on your security concern. I\'m glad our security team was able to help you.', timestamp: '15:00 PM' }
      ]
    },
    { 
      id: 5, 
      client: 'Bruce Wayne', 
      agent: 'Jane Smith', 
      date: '2023-05-30', 
      messages: 19, 
      escalationTime: '1 hour 8 mins',
      reason: 'Product defect report',
      priority: 'Medium',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'I purchased your premium software last week, but it\'s not working as advertised.', timestamp: '10:30 AM' },
        { id: 2, sender: 'agent', content: 'Hi Bruce, I\'m sorry to hear you\'re experiencing issues with our premium software. Can you tell me more about the problems you\'re encountering?', timestamp: '10:32 AM' },
        { id: 3, sender: 'client', content: 'The analytics dashboard is missing several features that were promised in the product description.', timestamp: '10:33 AM' },
        { id: 4, sender: 'agent', content: 'I apologize for the confusion. Let me check the current version of the software to verify what features should be available.', timestamp: '10:35 AM' },
        { id: 5, sender: 'agent', content: 'I\'ve reviewed your account and can confirm you have the correct premium version. Let me connect you with our product team to investigate this issue.', timestamp: '10:37 AM' },
        { id: 6, sender: 'client', content: 'Thank you. This is affecting my business operations.', timestamp: '10:38 AM' },
        { id: 7, sender: 'agent', content: 'I understand the urgency. I\'m escalating this to our product development team with priority status.', timestamp: '10:39 AM' },
        { id: 8, sender: 'client', content: 'I appreciate that.', timestamp: '10:40 AM' },
        { id: 9, sender: 'product', content: 'This is Emily from the product team. I\'m looking into the missing features in your premium software.', timestamp: '11:00 AM' },
        { id: 10, sender: 'product', content: 'I\'ve checked our latest release and there was indeed a bug that caused some features to be disabled in certain configurations.', timestamp: '11:02 AM' },
        { id: 11, sender: 'product', content: 'We\'ve prepared a patch that will restore all premium features. I can send it to you now.', timestamp: '11:03 AM' },
        { id: 12, sender: 'client', content: 'That would be great. How do I install it?', timestamp: '11:04 AM' },
        { id: 13, sender: 'product', content: 'The patch will automatically update when you restart the application. I\'ll send you detailed installation instructions via email.', timestamp: '11:05 AM' },
        { id: 14, sender: 'client', content: 'Perfect. I\'ll install it right away.', timestamp: '11:06 AM' },
        { id: 15, sender: 'client', content: 'The patch worked! All the missing features are now available. Thank you.', timestamp: '11:15 AM' },
        { id: 16, sender: 'product', content: 'Wonderful! I\'m glad that resolved the issue. We\'ve also credited your account with an additional month of service.', timestamp: '11:16 AM' },
        { id: 17, sender: 'client', content: 'That\'s very generous. Thank you for the quick resolution.', timestamp: '11:17 AM' },
        { id: 18, sender: 'agent', content: 'Hi Bruce, this is Jane following up on your escalated ticket. I\'m happy to hear the patch resolved your issue.', timestamp: '11:30 AM' },
        { id: 19, sender: 'client', content: 'Yes, everything is working perfectly now. Thank you for your assistance.', timestamp: '11:31 AM' }
      ]
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const itemsPerPage = 5

  // Handle show conversation button click
  const handleShowConversation = (conversation) => {
    setSelectedConversation(conversation)
    setShowChatModal(true)
  }

  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    if (!searchTerm) return conversations
    
    const term = searchTerm.toLowerCase()
    return conversations.filter(conversation => 
      conversation.client.toLowerCase().includes(term) ||
      conversation.agent.toLowerCase().includes(term) ||
      conversation.reason.toLowerCase().includes(term) ||
      conversation.priority.toLowerCase().includes(term)
    )
  }, [conversations, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredConversations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentConversations = filteredConversations.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const styles = {
    page: {
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      padding: '1rem 0'
    },
    pageTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '1rem',
      maxWidth: '300px'
    },
    searchInput: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      outline: 'none',
      fontSize: '0.875rem'
    },
    searchInputFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280',
      height: '1rem',
      width: '1rem'
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    },
    statusBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #ef4444'
    },
    priorityHigh: {
      color: '#ef4444',
      fontWeight: '600'
    },
    priorityMedium: {
      color: '#f59e0b',
      fontWeight: '600'
    },
    priorityLow: {
      color: '#10b981',
      fontWeight: '600'
    },
    // Modal styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '90%',
      maxWidth: '50rem',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #e5e7eb',
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      margin: 0,
    },
    modalCloseButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalCloseButtonHover: {
      color: '#111827',
      backgroundColor: '#f3f4f6',
    }
  }

  // Responsive styles
  const mediaStyles = `
    @media (max-width: 768px) {
      .page {
        padding: 0.75rem;
      }
      
      .pageTitle {
        font-size: 1.125rem;
      }
      
      .searchContainer {
        max-width: 100%;
        margin-bottom: 0.75rem;
      }
      
      .modal-body-mobile {
        flex-direction: column !important;
        overflow: auto !important;
      }
      
      .details-panel-mobile {
        width: 100% !important;
        border-right: none !important;
        border-bottom: 1px solid #e5e7eb !important;
        overflow-y: auto !important;
      }
      
      .chat-panel-mobile {
        width: 100% !important;
        overflow-y: auto !important;
      }
      
      .modalContainer {
        margin: 1rem;
        max-width: calc(100% - 2rem);
        flex-direction: column;
        overflow: auto;
      }
    }
    
    @media (max-width: 480px) {
      .page {
        padding: 0.5rem;
      }
      
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        padding: 0.75rem 0;
      }
      
      .modalContainer {
        width: 95%;
        height: 95vh;
        overflow: auto;
      }
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>
          <AlertCircle style={{ height: '1.5rem', width: '1.5rem', color: '#ef4444' }} />
          Escalated Conversations
        </h1>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
          onFocus={(e) => {
            e.target.style.borderColor = styles.searchInputFocus.borderColor;
            e.target.style.boxShadow = styles.searchInputFocus.boxShadow;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '';
            e.target.style.boxShadow = '';
          }}
        />
      </div>

      <div style={styles.tableContainer}>
        <ResponsiveTable
          columns={[
            { key: 'client', header: 'Client', isPrimary: true },
            { key: 'agent', header: 'Agent' },
            { key: 'date', header: 'Date' },
            { key: 'messages', header: 'Messages' },
            { key: 'escalationTime', header: 'Escalation Time' },
            { key: 'reason', header: 'Reason' },
            { key: 'priority', header: 'Priority' },
            { key: 'status', header: 'Status' },
            { key: 'actions', header: 'Actions', sortable: false }
          ]}
          data={currentConversations.map(conversation => ({
            id: conversation.id,
            client: conversation.client,
            agent: conversation.agent,
            date: conversation.date,
            messages: conversation.messages,
            escalationTime: conversation.escalationTime,
            reason: conversation.reason,
            priority: conversation.priority,
            status: 'Escalated',
            conversation: conversation
          }))}
          renderCell={(row, column) => {
            switch (column.key) {
              case 'client':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <User style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.client}
                  </div>
                );
              case 'agent':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <User style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.agent}
                  </div>
                );
              case 'date':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Calendar style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.date}
                  </div>
                );
              case 'messages':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MessageCircle style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.messages}
                  </div>
                );
              case 'priority':
                return (
                  <span style={{
                    ...(row.priority === 'High' ? styles.priorityHigh : 
                         row.priority === 'Medium' ? styles.priorityMedium : 
                         styles.priorityLow)
                  }}>
                    {row.priority}
                  </span>
                );
              case 'status':
                return (
                  <span style={styles.statusBadge}>
                    <AlertCircle style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                    {row.status}
                  </span>
                );
              case 'actions':
                return (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowConversation(row.conversation);
                    }}
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      fontWeight: '500',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      paddingLeft: '0.75rem',
                      paddingRight: '0.75rem',
                      borderRadius: '0.375rem',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8125rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    }}
                  >
                    <MessageCircle style={{ height: '1rem', width: '1rem' }} />
                    Show
                  </button>
                );
              default:
                return row[column.key];
            }
          }}
        />

        <ResponsivePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredConversations.length}
          showInfo={true}
          showNavigation={true}
        />
      </div>

      {/* Chat View Modal */}
      {showChatModal && selectedConversation && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContainer, maxWidth: '60rem'}}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                Conversation with {selectedConversation.client}
              </h3>
              <button 
                onClick={() => setShowChatModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.color = styles.modalCloseButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.modalCloseButton.color}
              >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div style={{
              display: 'flex',
              height: '70vh',
              backgroundColor: '#f0f9ff'
            }} className="modal-body-mobile">
              {/* Client Info Panel */}
              <div style={{
                width: '30%',
                borderRight: '1px solid #e5e7eb',
                padding: '1rem',
                backgroundColor: '#ffffff',
                overflowY: 'auto'
              }} className="details-panel-mobile">
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #10b981',
                  textAlign: 'center'
                }}>
                  Conversation Details
                </h4>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#10b981',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}>
                    Client Information
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Client Name
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.client}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Agent
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.agent}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Date
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.date}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#10b981',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}>
                    Conversation Metrics
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Messages
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.messages}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Escalation Time
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.escalationTime}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#10b981',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}>
                    Status
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Current Status
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        <span style={styles.statusBadge}>
                          <AlertCircle style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                          Escalated
                        </span>
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Escalation Reason
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.reason}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Priority
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        <span style={{
                          ...(selectedConversation.priority === 'High' ? styles.priorityHigh : 
                               selectedConversation.priority === 'Medium' ? styles.priorityMedium : 
                               styles.priorityLow)
                        }}>
                          {selectedConversation.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat Panel */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f0f9ff',
                overflowY: 'auto'
              }} className="chat-panel-mobile">
                {/* Chat Header */}
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      flexShrink: '0',
                      height: '2.5rem',
                      width: '2.5rem',
                      borderRadius: '9999px',
                      backgroundColor: '#d1fae5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{
                        color: '#065f46',
                        fontWeight: '600'
                      }}>
                        {selectedConversation.client.charAt(0)}
                      </span>
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#111827'
                      }}>
                        {selectedConversation.client}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        Escalated Conversation
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Messages Container */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1rem',
                  backgroundColor: '#f0f9ff'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selectedConversation.conversationMessages && selectedConversation.conversationMessages.map((message) => (
                      <div 
                        key={message.id} 
                        style={{
                          display: 'flex',
                          justifyContent: message.sender === 'agent' || message.sender === 'tech' || message.sender === 'billing' || message.sender === 'exec' || message.sender === 'eng' || message.sender === 'security' || message.sender === 'product' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div style={{
                          maxWidth: '70%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '1rem',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          backgroundColor: message.sender === 'agent' || message.sender === 'tech' || message.sender === 'billing' || message.sender === 'exec' || message.sender === 'eng' || message.sender === 'security' || message.sender === 'product' ? '#10b981' : '#ffffff',
                          color: message.sender === 'agent' || message.sender === 'tech' || message.sender === 'billing' || message.sender === 'exec' || message.sender === 'eng' || message.sender === 'security' || message.sender === 'product' ? '#ffffff' : '#1f2937',
                          borderBottomLeftRadius: message.sender === 'client' ? '0.25rem' : undefined,
                          borderBottomRightRadius: message.sender === 'agent' || message.sender === 'tech' || message.sender === 'billing' || message.sender === 'exec' || message.sender === 'eng' || message.sender === 'security' || message.sender === 'product' ? '0.25rem' : undefined
                        }}>
                          <p style={{ marginBottom: '0.25rem' }}>{message.content}</p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: message.sender === 'agent' || message.sender === 'tech' || message.sender === 'billing' || message.sender === 'exec' || message.sender === 'eng' || message.sender === 'security' || message.sender === 'product' ? '#d1fae5' : '#9ca3af',
                            textAlign: message.sender === 'agent' || message.sender === 'tech' || message.sender === 'billing' || message.sender === 'exec' || message.sender === 'eng' || message.sender === 'security' || message.sender === 'product' ? 'right' : 'left'
                          }}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Status Banner */}
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                  This conversation has been escalated
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EscalatedConversationsPage