import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, HardDrive, LayoutDashboard, LogOut, Cpu, Trash2, Download, Lock, Mail, User as UserIcon, CheckCircle2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import * as mammoth from 'mammoth';
import toast, { Toaster } from 'react-hot-toast';

// Base Axios Configuration
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Accept'] = 'application/json';

// ==========================================
// 1. AUTHENTICATION SCREEN (EXECUTIVE TIER)
// ==========================================
const AuthScreen = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin ? '/api/login' : '/api/register';
    
    try {
      const res = await axios.post(endpoint, formData);
      const token = res.data.token;
      localStorage.setItem('pro_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setToken(token);
      toast.success(isLogin ? 'Authentication Successful' : 'Workspace Created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white relative overflow-hidden selection:bg-blue-600/30 font-sans">
      {/* Hyper-Realistic Background Lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[180px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 blur-[180px] rounded-full pointer-events-none"></div>
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} 
        className="bg-slate-900/40 backdrop-blur-3xl p-12 rounded-[2.5rem] border border-slate-700/50 w-full max-w-md relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(0,0,0,0.8)]">
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-slate-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.5)]">
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <h2 className="text-4xl font-serif text-center mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">PRO<span className="text-blue-500">ENGINE</span></h2>
        <p className="text-center text-slate-500 font-medium mb-10 text-xs uppercase tracking-[0.3em]">System Authentication</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input type="text" placeholder="Authorized Name" required className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          )}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input type="email" placeholder="Terminal Email" required className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input type="password" placeholder="Encryption Key (Min 8)" required minLength={8} className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl uppercase tracking-[0.2em] text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 border border-blue-400/20">
            {loading ? 'Authenticating...' : (isLogin ? 'Access Terminal' : 'Initialize Protocol')}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-xs tracking-wider">
          {isLogin ? "Require an access protocol?" : "Already possess clearance?"}{" "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-400 font-bold hover:text-blue-300 transition-colors ml-1 border-b border-blue-400/30 pb-0.5">
            {isLogin ? "Register Here" : "Login Here"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. MAIN DASHBOARD (100 TRILLION UI)
// ==========================================
const Dashboard = ({ setToken }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); 

  const wordRef = useRef(null);
  const imgRef = useRef(null);
  const compressRef = useRef(null);
  const navigate = useNavigate();

  const fetchDashboardData = () => {
    axios.get('/api/dashboard-data')
      .then(res => { setData(res.data); setLoading(false); })
      .catch(err => { if(err.response?.status === 401) handleLogout(); setLoading(false); });
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const handleLogout = async () => {
    try { await axios.post('/api/logout'); } catch(e) {}
    localStorage.removeItem('pro_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    toast.success("Connection Severed.");
    navigate('/auth');
  };

  const uploadToLaravel = async (blob, originalName, originalSize, type, finalName) => {
    const formData = new FormData();
    formData.append('pdf', blob, finalName);
    formData.append('original_name', originalName);
    formData.append('original_size', originalSize);
    formData.append('conversion_type', type);

    try {
      setProgress(10);
      const res = await axios.post('/api/save-client-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      if (res.data.success) {
        toast.success("Execution Complete. Data Secured.");
        fetchDashboardData();
      }
    } catch (err) { toast.error("Upload failed."); } 
    finally {
      setTimeout(() => setProgress(0), 1000);
      if(wordRef.current) wordRef.current.value = "";
      if(imgRef.current) imgRef.current.value = "";
      if(compressRef.current) compressRef.current.value = "";
    }
  };

  // --- Core Processing Engines ---
  const processWordFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProgress(5); toast.loading("Rendering Typography...", {id: 'process'});
    
    const reader = new FileReader();
    reader.onload = (event) => {
      mammoth.convertToHtml({ arrayBuffer: event.target.result }).then((result) => {
          const content = `<div style="padding: 60px; font-family: 'Georgia', serif; background: white;">${result.value || "<p>Blank Content.</p>"}</div>`;
          html2pdf().set({ margin: 0, filename: 'ClassicOutput.pdf' }).from(content).outputPdf('blob').then((pdfBlob) => {
            toast.dismiss('process');
            uploadToLaravel(pdfBlob, file.name, file.size, 'word_to_pdf', 'ProEngine_Classic.pdf');
          });
        });
    };
    reader.readAsArrayBuffer(file);
  };

  const processImgToPdf = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProgress(5); toast.loading("Binding Media...", {id: 'process'});

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = `<div style="padding: 40px; text-align: center;"><img src="${event.target.result}" style="max-width: 700px; max-height: 700px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"></div>`;
      html2pdf().set({ margin: 0, filename: 'MediaFrame.pdf' }).from(content).outputPdf('blob').then((pdfBlob) => {
        toast.dismiss('process');
        uploadToLaravel(pdfBlob, file.name, file.size, 'image_to_pdf', 'ProEngine_Media.pdf');
      });
    };
    reader.readAsDataURL(file);
  };

  const processCompressor = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProgress(5); toast.loading("Optimizing Geometry...", {id: 'process'});

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = img.width; let height = img.height;
        if (width > height) { if (width > 1200) { height *= 1200 / width; width = 1200; } } else { if (height > 1200) { width *= 1200 / height; height = 1200; } }
        canvas.width = width; canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          toast.dismiss('process');
          uploadToLaravel(blob, file.name, file.size, 'image_compress', file.name.replace(/\.[^/.]+$/, "_opt.jpg"));
        }, 'image/jpeg', 0.5); 
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const deleteFile = async (id) => {
    if(window.confirm("Authorize permanent deletion of this asset?")) {
        try { await axios.delete(`/api/delete/${id}`); toast.success("Asset Purged."); fetchDashboardData(); } 
        catch (err) { toast.error("Purge Failed."); }
    }
  };

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Cpu className="w-16 h-16 text-blue-500 animate-spin" /></div>;

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen font-sans relative selection:bg-blue-600/30">
      
      {/* 100 TRILLION DOLLAR GLOWING PROGRESS LINE */}
      <div className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-emerald-400 z-[100] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(59,130,246,0.8)]" style={{ width: `${progress}%`, opacity: progress > 0 ? 1 : 0 }}></div>

      {/* Hyper-Realistic Backgrounds */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <header className="bg-slate-900/50 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_5px_15px_rgba(0,0,0,0.5)] border border-slate-700/50"><Cpu className="w-6 h-6 text-blue-400" /></div>
            <h1 className="text-3xl font-serif tracking-tight text-white">PRO<span className="text-blue-500">ENGINE</span></h1>
          </div>
          <div className="flex items-center space-x-6 border-l border-slate-800 pl-6">
            <div className="text-right hidden md:block">
                <span className="text-sm font-bold text-white block">{data?.user?.name || "Administrator"}</span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 flex items-center justify-end"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse mr-1.5"></span> Verified</span>
            </div>
            <button onClick={handleLogout} className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-all shadow-inner"><LogOut className="w-5 h-5"/></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-serif text-white mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">Executive Architecture</h2>
          <p className="text-slate-400 font-medium text-lg">Secure client-side document compilation and geometry optimization.</p>
        </div>

        {/* 100 TRILLION DOLLAR ACTION BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="relative overflow-hidden bg-gradient-to-b from-slate-800/50 to-slate-900/80 backdrop-blur-3xl border border-slate-700/50 p-10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(99,102,241,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer" onClick={() => wordRef.current.click()}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500"><FileText className="w-32 h-32 text-indigo-400" /></div>
            <div className="w-16 h-16 bg-slate-900/80 border border-slate-700 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative z-10 text-indigo-400 group-hover:text-indigo-300 transition-colors"><FileText className="w-8 h-8" /></div>
            <h3 className="text-2xl font-serif text-white mb-3 relative z-10">Word to PDF</h3>
            <p className="text-slate-400 text-sm font-medium relative z-10">Compile classic document layouts with high fidelity.</p>
            <input type="file" ref={wordRef} className="hidden" accept=".docx" onChange={processWordFile} />
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-slate-800/50 to-slate-900/80 backdrop-blur-3xl border border-slate-700/50 p-10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer" onClick={() => imgRef.current.click()}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500"><LayoutDashboard className="w-32 h-32 text-blue-400" /></div>
            <div className="w-16 h-16 bg-slate-900/80 border border-slate-700 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative z-10 text-blue-400 group-hover:text-blue-300 transition-colors"><LayoutDashboard className="w-8 h-8" /></div>
            <h3 className="text-2xl font-serif text-white mb-3 relative z-10">Image to PDF</h3>
            <p className="text-slate-400 text-sm font-medium relative z-10">Bind rich media frames into standardized portfolios.</p>
            <input type="file" ref={imgRef} className="hidden" accept="image/*" onChange={processImgToPdf} />
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-slate-800/50 to-slate-900/80 backdrop-blur-3xl border border-slate-700/50 p-10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(52,211,153,0.1)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer" onClick={() => compressRef.current.click()}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500"><HardDrive className="w-32 h-32 text-emerald-400" /></div>
            <div className="w-16 h-16 bg-slate-900/80 border border-slate-700 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative z-10 text-emerald-400 group-hover:text-emerald-300 transition-colors"><HardDrive className="w-8 h-8" /></div>
            <h3 className="text-2xl font-serif text-white mb-3 relative z-10">Geometry Optics</h3>
            <p className="text-slate-400 text-sm font-medium relative z-10">Aggressively compress visual weight while maintaining structure.</p>
            <input type="file" ref={compressRef} className="hidden" accept="image/jpeg, image/png" onChange={processCompressor} />
          </div>

        </div>

        {/* SECURE VAULT REGISTRY */}
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-3xl font-serif text-white">System Registry</h3>
           <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest flex items-center shadow-inner">
               <Lock className="w-3 h-3 mr-2 text-blue-400" /> End-to-End Encrypted
           </span>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/80 text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold border-b border-slate-700/50">
                <tr>
                  <th className="px-10 py-8">Asset Identity</th>
                  <th className="px-10 py-8">Engine</th>
                  <th className="px-10 py-8 text-right">Weight</th>
                  <th className="px-10 py-8 text-right">Protocols</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {data?.history?.length === 0 ? (
                  <tr><td colSpan="4" className="px-10 py-32 text-center text-slate-500 font-medium">Registry is pristine. Initiate a protocol sequence above.</td></tr>
                ) : (
                  data?.history?.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="font-bold text-slate-200 text-sm truncate max-w-[250px]">{file.original_name}</p>
                        </div>
                      </td>
                      <td className="px-10 py-6"><span className="px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-400 shadow-inner">{file.conversion_type.replace(/_/g, ' ')}</span></td>
                      <td className="px-10 py-6 text-right font-mono font-bold text-xs text-blue-400">{file.converted_size ? (file.converted_size / 1024).toFixed(2) + ' KB' : '--'}</td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end space-x-3">
                          <a href={`http://localhost:8000/api/download/${file.id}`} download className="p-3 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 rounded-xl transition-all shadow-inner hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"><Download className="w-4 h-4" /></a>
                          <button onClick={() => deleteFile(file.id)} className="p-3 bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 rounded-xl transition-all shadow-inner hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// ==========================================
// 3. MASTER ROUTER & TOAST MANAGER
// ==========================================
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('pro_token'));

  useEffect(() => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ 
        style: { background: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '1.5rem', padding: '20px', fontWeight: 'bold', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', fontFamily: 'Inter, sans-serif' },
        success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
        loading: { iconTheme: { primary: '#3b82f6', secondary: '#fff' } }
      }} />
      
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={!token ? <AuthScreen setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
